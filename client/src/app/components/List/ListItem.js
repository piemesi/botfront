import React, {Component} from 'react';
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
            active: this.props.material.active,
            open: false,
        };
    }


    handleOpen = () => {
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
        this.props.updateMaterial(material, this.props.material.id)
        // this.setState({active: toggle});
    };

    handleDeleteToggle = (event, toggle) => {

        let material = {...this.props.material, hide: toggle};
        this.props.updateMaterial(material, this.props.material.id)
        // this.setState({active: toggle});
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

        {/*<FlatButton*/}
            {/*label="Submit"*/}
            {/*primary={true}*/}
            {/*keyboardFocused={true}*/}
            {/*onTouchTap={this.updateEditData.bind(this)}*/}
        {/*/>,*/}
        let {material} = this.props

        let htmlInput = material.text
        let htmlToReactParser = new Parser();
        let preparedText = htmlToReactParser.parse(htmlInput);
        return (
            <Card style={material.sent ? {...{},backgroundColor:'#ccc'} :{} } key={material.id} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                <CardHeader
                    title={material.title}
                    subtitle={"создано: " + material.created_at}
                    // avatar="images/ok-128.jpg"
                    actAsExpander={true}
                    showExpandableButton={true}
                >
                  <Periods chipData={material.periods || null}/>
                </CardHeader>
                <CardText className="cardText">
                    <div style={{display:'flex', justifyContent:'flex-start'}}>
                    <Toggle
                    toggled={this.state.expanded}
                    onToggle={this.handleToggle}
                    labelPosition="right"
                    label="Показать пост"
                    style={{    marginRight: '30px', width:'initial'}}
                    />
                        <Link to={`/show/${material.channel_id}/${material.hash}`}>
                            Перейти на страницу поста
                        </Link>

</div>


                    {/*<Toggle*/}
                        {/*key={'act'+material.id}*/}
                        {/*defaultToggled={material.active}*/}
                        {/*onToggle={this.handleActiveToggle}*/}
                        {/*labelPosition="right"*/}
                        {/*label={"Active" + material.active}*/}
                    {/*/>*/}


                </CardText>
                {/*<CardMedia*/}
                {/*expandable={true}*/}
                {/*overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle"/>}*/}
                {/*>*/}
                {/*<img src="images/nature-600-337.jpg" alt=""/>*/}
                {/*</CardMedia>*/}
                <CardTitle title={material.title} subtitle={"обновлено: " + material.updated_at} expandable={true}/>
                <CardText expandable={true}>
                    {preparedText}
                </CardText>
                <CardActions>
                    <IconMenu
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    >
                        <MenuItem onTouchTap={this.handleOpen} primaryText="Edit" leftIcon={<EditIcon />} />
                        <Divider />


                        <MenuItem  leftIcon={<Toggle
                            key={'act'+material.id}
                            defaultToggled={material.active}
                            onToggle={this.handleActiveToggle}
                            labelPosition="right"
                            // label={"Active" + material.active}
                        />}  value="Del" primaryText="Активный"  >

                        </MenuItem>
                        <Divider />
                        <MenuItem  leftIcon={<Toggle
                            key={'del'+material.id}
                            defaultToggled={material.hide}
                            onToggle={this.handleDeleteToggle}
                            labelPosition="right"
                            // disabled={material.hide}
                            // label={"Hide" + material.hide}
                        />}  value="Del" primaryText="Удалить"  >

                        </MenuItem>


                    </IconMenu>
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
                    >
                        <UpdatePage closeBtn={()=>this.handleClose()}  ref={(r)=>{
                            this.updateEditPage=r
                        }} material={material}  />

                    </Dialog>
                    {/*<FlatButton label="Expand" onTouchTap={this.handleExpand}/>*/}
                    <FlatButton label="Свернуть описание поста" onTouchTap={this.handleReduce}/>
                </CardActions>
            </Card>




        );
    }
}


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