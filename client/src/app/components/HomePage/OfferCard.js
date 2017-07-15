import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Flight from 'material-ui/svg-icons/action/flight-takeoff';
import GridListExampleSingleLine from './OfferGallery';
import Group from 'material-ui/svg-icons/social/group';
import Person from 'material-ui/svg-icons/social/person';

import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import IconButton from 'material-ui/IconButton';



import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {selectNewOffer} from '../../actions'


const flightDataKeys = {
    from: 'Вылет из',
    flightNum: 'Рейс',
    flightBegin: 'Вылет в'
};

class CardExampleControlled extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            open: false,
        };
    }

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    };

    handleToggle = (event, toggle) => {
        this.setState({expanded: toggle});
    };

    handleExpand = () => {
        this.setState({expanded: true});
    };

    handleReduce = () => {
        this.setState({expanded: false});

        this.props.selectNewOffer();
    };

    /// popover
    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
/// popover


    render() {

        const info = [];
        if (this.props.item.flight.has) {
            let data = this.props.item.flight.data;
            let size = Object.keys(data).length;

            if (size) {
                for (let key in data) {
                    info.push(flightDataKeys[key] + ' ' + data[key]);
                }

            }

        }

        const flightData = info.join(' | ') ;
        console.log(flightData)

        return (
            <Card style={{width: "100%", flexGrow: 1}} expanded={this.state.expanded}
                  onExpandChange={this.handleExpandChange}>
                <CardHeader style={{width: "97%", flexGrow: 1}}

                            {...this.props.item.header}


                            subtitle={this.props.item.body.location == undefined ? '' : this.props.item.body.location.info}


                            actAsExpander={true}
                            showExpandableButton={true}
                />
                <CardText expandable={true}>
                    <Toggle
                        toggled={this.state.expanded}
                        onToggle={this.handleToggle}
                        labelPosition="right"
                        label="северный гоа-калангут"
                    />
                </CardText>


                <GridListExampleSingleLine expandable={true}/>

                {/*<div expandable={true} style={{*/}
                {/*display: "flex", alignContent: "baseline",*/}
                {/*flexWrap: "nowrap",*/}
                {/*justifyContent: "space-between",*/}
                {/*alignItems: "flex-start", justifyItems: "flex-start"*/}
                {/*}}>*/}
                {/*<div style={{flexGrow: 1}}><CardMedia*/}
                {/*expandable={true}*/}
                {/*style={{maxWidth: "700px"}}*/}
                {/*overlay={<CardTitle title="Большое Алтайское путешествие" subtitle="Overlay subtitle"/>}*/}
                {/*>*/}
                {/*<img src={this.props.body.mainImage}/>*/}

                {/*</CardMedia></div>*/}
                {/*<div style={{maxWidth: "400px"}}>{ this.props.body.images.map(item => {*/}

                {/*return (<img style={{border: "1px solid"}} height={66} src={item}/>)*/}
                {/*})}*/}
                {/*</div>*/}


                {/*</div>*/}
                <CardTitle title="Card title"
                           subtitle="Типы: Пеший, Сплав, Комбинированный, Средняя сложность, Участникам с опытом, Новый маршрут, более 15 дней, Поход с палатками, Переходы с рюкзаками"
                           expandable={true}/>
                <CardText expandable={true}>
                    Это приключение для опытных туристов. Нам предстоит проделать действительно большой путь по Горам,
                    рекам и бездорожью Горного Алтая. Мы сплавимся по величественной Катуни, уйдём глубоко в горы,
                    преодолеем перевалы, увидим по-настоящему дикую и нетронутую природу Горного Алтая с кристально
                    чистыми реками, озёрами, завораживающими водопадами и «лесными жителями».
                    Обратите внимание, предложено 2 варианта программы, различные по стоимости и продолжительности (11
                    дней и 18 дней).
                </CardText>
                <CardActions>
                   <FlatButton label={ this.props.item.flight.has ?

                        <Flight /> : <Flight style={{color: 'lightGrey'}}/>}
                                onTouchTap={this.handleExpand}/>
                    <FlatButton label="Reduce" onTouchTap={this.handleReduce}/>

                    {(this.props.item.price !== undefined ? <FlatButton label={this.props.item.price.total + " " + " руб."}/> : <FlatButton label="Цена по запросу" />)}


                    <FlatButton label={this.props.item.header.duration + " ночей"} onTouchTap={this.handleExpand}/>
                    <FlatButton label="BB" onTouchTap={this.handleTouchTap}>
                        <Popover
                            open={this.state.open}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            onRequestClose={this.handleRequestClose}
                            animation={PopoverAnimationVertical}
                        >
                            <Menu>
                                <MenuItem primaryText="BB - завтрак шведский стол" />
                                <MenuItem primaryText="HB - двухразовое питание (завтра, ужин)" />
                                <MenuItem primaryText="FB - трехразовое питание" />
                                <MenuItem primaryText="AI - Все включено" />
                            </Menu>
                        </Popover>
                    </FlatButton>
                    <FlatButton label={this.props.item.header.dateFrom + " - " + this.props.item.header.dateTo} onTouchTap={this.handleExpand}/>
                    <FlatButton
                        label={(this.props.item.header.pax == 1) ? <Person style={{color: 'lightGrey'}}/> : <Group  />}
                        onTouchTap={this.handleExpand}/>
                </CardActions>
            </Card>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        offers: state.offersReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

      selectNewOffer: bindActionCreators(selectNewOffer, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardExampleControlled)