import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import Periods from './ListItemPeriods'

import {

    Link
} from 'react-router-dom'

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


import Dialog from 'material-ui/Dialog';
import UpdatePage from '../Update'

import ActionDone from 'material-ui/svg-icons/action/done';

//REDUX
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions'


import './list.scss'

/// HTML Parse
import {Parser} from 'html-to-react';


class ListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            tasksList: [],
            hide: this.props.material.hide,
            active: this.props.material.active,
            open: false,
        };
    }


    handleOpen = () => {
        this.props.closeDrawer();
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };


    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    };

    handleToggle = (event, toggle) => {
        this.setState({expanded: toggle});
    };

    handleActiveToggle = (event, toggle) => {

        let material = {...this.props.material, active: toggle};
        this.props.updateMaterial(material, this.props.material.hash)
        this.setState({active: toggle});
    };

    handleDeleteToggle = (event, toggle) => {

        let material = {...this.props.material, hide: toggle};
        this.props.updateMaterial(material, this.props.material.hash)
        this.setState({hide: toggle});
    };

    handleExpand = () => {
        this.setState({expanded: true});
    };

    handleReduce = () => {
        this.setState({expanded: false});
    };


    render() {


        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,

        ];

        {/*<FlatButton*/
        }
        {/*label="Submit"*/
        }
        {/*primary={true}*/
        }
        {/*keyboardFocused={true}*/
        }
        {/*onTouchTap={this.updateEditData.bind(this)}*/
        }
        {/*/>,*/
        }
        let {material} = this.props;

        let htmlInput = material.text
        let htmlToReactParser = new Parser();
        let preparedText = htmlToReactParser.parse(htmlInput);

        let per = new Date(material.sent );
        per.setTime(per.getTime() + (3*60*60*1000));


        let options = {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute:'numeric'
        };

        let sentDate = per.toLocaleString("ru", options);

        let sentLabel = "отправлено: " + sentDate;

        return (
            <Card className="list__post-item"  style={material.sent ? {...{}, backgroundColor: '#ccc'} : {} } key={material.id}
                  expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                <CardHeader
                    style={{
                        display:'flex',
                        flexWrap:'wrap',
                    }}
                    title={material.title}
                    subtitle={this.props.isSent ? sentLabel : "создано: " + material.created_at}
                    // avatar="images/ok-128.jpg"
                    actAsExpander={true}
                    showExpandableButton={true}
                >
                    <Periods chipData={material.periods || null}/>
                </CardHeader>

                {/*<CardMedia*/}
                {/*expandable={true}*/}
                {/*overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle"/>}*/}
                {/*>*/}
                {/*<img src="images/nature-600-337.jpg" alt=""/>*/}
                {/*</CardMedia>*/}
                <CardTitle title={material.title} subtitle={"обновлено: " + material.updated_at} expandable={true}/>
                <CardText className="post__body-preview" expandable={true} style={{  }}>
                    {preparedText}
                </CardText>
                <CardText className="cardText">
                    <div style={{display: 'flex', justifyContent: 'space-between',alignItems:'center'}}>
                        {/*<Toggle*/}
                        {/*toggled={this.state.expanded}*/}
                        {/*onToggle={this.handleToggle}*/}
                        {/*labelPosition="right"*/}
                        {/*label="Показать пост"*/}
                        {/*style={{marginRight: '30px', width: 'initial'}}*/}
                        {/*/>*/}

                        {this.props.isSent ?
                            <div style={{display:'flex',alignItems:'center', textTransform:'uppercase',fontSize:12, color:'rgba(0, 0, 0, 0.3)'}}><ActionDone size={10} color="grey"  style={{marginRight:'10px'}} />  Отправленно</div>
                        :
                            this.state.active ?
                                <span style={{color:'green', fontWeight:'bold'}}> активный </span> :
                                <span style={{color:'red' }}> неактивный </span>
                        }



                        <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        >


                                <MenuItem disabled={this.props.isSent} onTouchTap={this.handleOpen} primaryText="Edit" leftIcon={<EditIcon />}/>
                                <Divider />


                                <MenuItem
                                    disabled={this.props.isSent}
                                    leftIcon={<Toggle
                                        disabled={this.props.isSent}
                                key={'act' + material.id}
                                toggled={this.state.active}
                                onToggle={this.handleActiveToggle}
                                labelPosition="right"
                                // label={"Active" + material.active}
                                />} value="Del" primaryText="Активный">

                                </MenuItem>


                            <Divider />
                            <MenuItem leftIcon={<Toggle
                                key={'del' + material.id}
                                toggled={this.state.hide}
                                onToggle={this.handleDeleteToggle}
                                labelPosition="right"
                                // disabled={material.hide}
                                // label={"Hide" + material.hide}
                            />} value="Del" primaryText="Удалить">

                            </MenuItem>


                        </IconMenu>




                        <Link to={`/show/${material.channel_id}/${material.hash}`}>
                            Перейти на страницу поста
                        </Link>

                        <FlatButton disabled={this.state.expanded !==true} labelStyle={this.state.expanded ? {} : {color:"ccc"}} label="Свернуть описание поста" onTouchTap={this.handleReduce}/>

                    </div>



                </CardText>
                <CardActions>




                </CardActions>

                <Dialog
                    title="Редактирование поста"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                    bodyClassName="dialog-body"
                    contentClassName="dialog-content"
                    overlayClassName="dialog-overlay"
                    paperClassName="dialog-paper"
                    style={{paddingTop:"0px",top:"0px"}}
                >
                    {this.state.open ?
                        <UpdatePage key={material.hash} hash={material.hash} closeBtn={(e) => this.handleClose(e)}
                                    ref={(r) => {
                                        this.updateEditPage = r
                                    }} material={{
                            periods: material.periods,
                            hash: material.hash,
                            hide: this.state.hide,
                            active: this.state.active
                        }}/>//...material
                        : ''}

                </Dialog>
            </Card>




        );
    }
}

ListItem.propTypes = {
    closeDrawer: PropTypes.func,
    isSent: PropTypes.bool
};

ListItem.defaultProps = {
    isSent: false
};

function mapStateToProps(state) {
    return {
        tasks: state.tasksReducer.tasks,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateMaterial: bindActionCreators(actions.updateMaterial, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListItem)