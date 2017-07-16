// import faker from 'faker'
import constants from '../constants'
import {getHashOffersRoute } from '../constants/routes'

import axios from 'axios'
import cors from 'cors'
import _ from 'lodash'

import { apiUrl } from '../../../config/config.json';

export const addNewUser = () => {
    // const username = `@${faker.internet.userName().toLowerCase()}`
    return dispatch => {
        dispatch({
            type: 'ADD_NEW_USER',
            username
        })

        dispatch(newMessage(
            username,
            'Hello guys..',
            Date.now()
        ))
    }
}

export const selectNewOffer = (author, text, datetime) => {
    return {
        type: 'SELECT_NEW_OFFER',
        author, text, datetime
    }
};

export const setFocusedItem = (materialId) => {
    console.log("HI" + materialId)
    return {
            type: 'SET_FOCUSED_MATERIAL',
            materialId
        }
};


export const updateMaterial = (data, materialId, noStart = false) => {

    console.log('START222', data)

    let url = apiUrl+"/updatedata/"+materialId
    console.log('START222', url)
    // var materialData = _.toArray(data);
    let bodyData = new FormData();


    let pers = []

    console.log('PRESTART222', data)


    _.forIn(data, function(value, key) {
        console.log('materialData'+key, value);
        if(key==='periods') {
            console.log('periods', _.values(value));

            _.forIn(value, function(valuePer) {
                console.log('periods',valuePer);
                pers.push(noStart ? valuePer : valuePer.start)
            })

        }else{
            bodyData.append(key, value);
        }


    });

    bodyData.append('dates', pers.join(','));
    console.log('dates', pers);

    return (dispatch) => {
        dispatch({
            type: 'UPDATE_DATA',
            payload: fetch(url, {
                // headers: {
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/json',
                // },
                method: 'post',
                body: bodyData
                //     JSON.stringify({
                //     data
                // })

                // body: this.state.data.header
            })
                .then(response => {
                    console.log('START response', response)
                    if( response.ok ) {
                        let resp = response.json()
                        console.log('START resp', resp)
                        return resp
                    }
                    else {
                        return Promise.reject();
                    }
                })
                .then(json => {
                    return Promise.resolve(json)
                })
        })
    };
};

export const increasePostShows = (hash) => {



    let url = `${apiUrl}/post/${hash}/show/increase`
    console.log('START222', url)

    return (dispatch) => {
        dispatch({
            type: 'POST_SHOWS_INCREASE',
            payload: fetch(url)
                .then(response => {
                    console.log('START response', response)
                    if( response.ok ) {
                        let resp = response.json()
                        console.log('START resp', resp)
                        return resp
                    }
                    else {
                        return Promise.reject();
                    }
                })
                .then(json => {
                    return Promise.resolve(json)
                })
        })
    };
};

export const getPost = (hash) => {



    let url = `${apiUrl}/get_post/`+ hash
    console.log('START222', url)

    return (dispatch) => {
        dispatch({
            type: 'GET_POST',
            payload: fetch(url)
                .then(response => {
                    console.log('START response', response)
                    if( response.ok ) {
                        let resp = response.json()
                        console.log('START resp', resp)
                        return resp
                    }
                    else {
                        return Promise.reject();
                    }
                })
                .then(json => {
                    return Promise.resolve(json)
                })
        })
    };
};

export const getPostsForChannel = (data, actType = 0) => {

    console.log('START222', data)

    let listRoutes = [{
        link:'get_posts',
        type:'GET_POSTS'
    },{
        link:'get_posts_sent',
        type:'GET_POSTS_SENT'
    },{
        link:'get_posts_unsent',
        type:'GET_POSTS_UNSENT'
    } ]

    let url = `${apiUrl}/${listRoutes[actType].link}/`+ data
    console.log('START222', url)

    return (dispatch) => {
        dispatch({
            type: listRoutes[actType].type,
            payload: fetch(url)
                .then(response => {
                    console.log('START response', response)
                    if( response.ok ) {
                        let resp = response.json()
                        console.log('START resp', resp)
                        return resp
                    }
                    else {
                        return Promise.reject();
                    }
                })
                .then(json => {
                    return Promise.resolve(json)
                })
        })
    };
};


// let promis = axios.get(`${apiUrl}/get_posts/1` ); //, , mode:'no-cors'}
//  if(response.status == 200){



export const getHashOffers = () => {


    return (dispatch) => {
        dispatch({
            type: constants.GET_HASH_OFFERS,
            payload: fetch(getHashOffersRoute())
                .then(response => {
                    if( response.ok ) {
                        return response.json()
                    }
                    else {
                        return Promise.reject();
                    }
                })
                .then(json => {
                    return Promise.resolve(json)
                })
        })
    };
};

export const showMap = () => {
    return {
        type: 'SHOW_MAP'
    }
};

export const showSearch = () => {

    return {
        type: 'SHOW_SEARCH'
    }
};

export const selectCountries = (selected) => {

    return {
        type: 'SELECT_COUNTRIES',
        selected
    }
};