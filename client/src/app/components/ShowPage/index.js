import React, {Component} from 'react';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLooks from 'material-ui/svg-icons/action/visibility';
import IconClock from 'material-ui/svg-icons/device/access-time';
// import IconButton from 'material-ui/SvgIcon';
import muiThemeable from 'material-ui/styles/muiThemeable';
import * as colors from 'material-ui/styles/colors';

//REDUX
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions'


/// HTML Parse
import './show.scss'
import {Parser} from 'html-to-react';
import moment from 'moment';
import 'moment/locale/ru';
/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class ShowPage extends Component {

    constructor(props) {
        super(props)
        this.getPost()
    }

    state = {
        published: '',
        header: '',
        body: '',
        shows: '',
        timeToRead: ''

    };


    getPost = () => {

        this.props.getPost(this.props.postHash)

    }


    componentWillMount() {
        if (!this.props.currentPost) {
            setTimeout(() => {
                console.log('currentPost', this.props.currentPost)

                let {created_at, title, text, shows = 0, minutes_to_read: timeToRead} = this.props.currentPost

                const published = moment(created_at); //,'DD-MMMM-YYYY H:m'
                published.locale('ru'); //
                let htmlInput = text
                let htmlToReactParser = new Parser();
                let preparedText = htmlToReactParser.parse(htmlInput);

                let selfShow = shows
                if (!localStorage.getItem('hr_' + this.props.postHash)) {
                    selfShow++
                    this.props.increasePostShows(this.props.postHash)
                    let now = moment();
                    localStorage.setItem('hr_' + this.props.postHash, now.toString())
                }


                let clock = timeToRead ?
                    <div style={{alignItems: 'center', display: 'flex'}}>
                        {/*<IconButton*/}
                        {/*color={colors.grey300}*/}
                        {/*style={{*/}
                        {/*paddingRight: '5px',*/}
                        {/*color: colors.grey300*/}
                        {/*}} tooltip="Ориентировочное время прочтения поста"*/}
                        {/*>*/}
                        <IconClock
                            style={{
                                paddingRight: '5px',
                                color: colors.grey300
                            }}
                        /> {timeToRead} мин.
                    </div> : ''

                this.setState({
                    published: published.format('DD MMMM YYYY, H:m'),
                    header: title,
                    body: preparedText,
                    shows: selfShow,
                    timeToRead: clock

                })
            }, 500)
        }


    }

    select = (index) => {
        this.props.getPostsForChannel(1, index)
        this.setState({selectedIndex: index});
    }

    render() {
        return (
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <Paper zDepth={1} style={{
                    padding: '20px 30px',
                    marginTop: '30px', maxWidth: '800px',
                    marginBottom: '30px',
                    margin: '20 30 30',
                    height: '100%'
                }}>
                    <main>
                        <div style={{
                            color: colors.grey500,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '14px', height: '40px'
                        }}>
                            <span>{this.state.published}
                            </span>


                            {this.state.timeToRead}

                            <div style={{alignItems: 'center', display: 'flex'}}>

                                <IconLooks
                                    style={{
                                        paddingRight: '5px',
                                        color: colors.grey300
                                    }}
                                /> {this.state.shows}

                            </div>
                        </div>

                        <h1 style={{color: colors.purple800}}>{this.state.header}</h1>
                        <section>
                            {this.state.body}
                        </section>
                    </main>
                </Paper>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentPost: state.tasksReducer.post,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        increasePostShows: bindActionCreators(actions.increasePostShows, dispatch),
        getPost: bindActionCreators(actions.getPost, dispatch)
    }
}


const withMui = muiThemeable()(ShowPage);
export default connect(mapStateToProps, mapDispatchToProps)(withMui)