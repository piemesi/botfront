import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import FontIcon from 'material-ui/FontIcon';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
// import Globe from 'material-ui/svg-icons/places/airport-shuttle';
import Sunny from 'material-ui/svg-icons/image/wb-sunny';
import Business from 'material-ui/svg-icons/communication/business';
import Landscape from 'material-ui/svg-icons/image/landscape';
import OfferCard from './OfferCard';
// import MasonryOffer from './MasonryOffer';

import Beach from 'material-ui/svg-icons/places/beach-access';
import Star from 'material-ui/svg-icons/toggle/star';
import People from 'material-ui/svg-icons/social/people';
import Bus from 'material-ui/svg-icons/maps/directions-bus';

 import './font.less';
import FontAwesome from 'react-fontawesome';

import Flight from 'material-ui/svg-icons/maps/flight';

// REDUX
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addNewUser, selectNewOffer } from '../../actions'



const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        padding: 0,

    },
};
// 1 по отелю!
// самый дешевый по отелю не меньше 5ти дней
// или цена за день самая дешевая - т.е. 5 дней за 50000, а 7 дней - за 68000 - показываем за семь - но храним в коллекции предложения по остальному кол-ву дней
// приоритет всегда - 2AD, если не выбрано другое.
// выводим ближайшую дату. Но в списке - сделать tooltip - доступные даты

// в footer'е - телеграм, faq(?), "корзина"

// по каждому оферу - уточняющая консультация в телеграм

// позже, возможно, сделать обработку по тегам - типа "подберите, чтоб-нибудь недорого с детьми, не очень жарко, русских немного, с экскурсиями, " [economy, children, notHot, fewRussians, excursions] или "пивной регион и тд", "перелет только аэрофлотом"






const cardItems = [
    {
        id: 1,
        header: {
            title: "Большое Алтайское путешествие",
            stars: 3,
            direction: 'Россия, Алтай',
            subtitle: "Барнаул – Мульта – Нижнее Мультинское озеро – оз.Славных девчат – оз.Поперечное Мультинское – устье Аккема – оз.Ниж.Шавлинское – оз.Верхнее Шавлинское – плато Ештыкёль – пос.Чибит – Барнаул",
            avatar: "images/p/1/1.jpg",


            appearTime: 1495903059532,
            offerFreshness: "green", //blue, yellow, grey, red

            dateFrom: "20.06.17",
            dateTo: "26.06.17",
            duration: 6,
            extLink: "https://www.tui.ru/Tours/Europe/Bulgaria/North-Coast-Varna/Golden-sands/chaika-area-cabacum-beach/Detelina/#?DepartureDate=2017-06-09%7C2017-06-09&AdultCount=2&NightsFrom=7&NightsTo=7",
            rating: "7.4",

            durationFrom: 11,
            durationsTo: 18,
            routeLength: 250,
            pax: 2,
            info: "Это приключение для опытных туристов. Нам предстоит проделать действительно большой путь по Горам, рекам и бездорожью Горного Алтая. Мы сплавимся по величественной Катуни, уйдём глубоко в горы, преодолеем перевалы, увидим по-настоящему дикую и нетронутую природу Горного Алтая с кристально чистыми реками, озёрами, завораживающими водопадами и «лесными жителями». \nОбратите внимание, предложено 2 варианта программы, различные по стоимости и продолжительности (11 дней и 18 дней).",
        },

        body: {
            info: "Экономичный популярный отель, расположенный в 400 м от популярного песчаного пляжа Кабакум и в 2,5-3 км от курорта Золотые Пески, предлагает своим гостям симпатичные номера, открытый бассейн на ухоженной территории, бесплатный wi-fi.",
            mainImage: 'images/p/1.jpg',
            images: [
                'images/p/1/1.jpg',
                'images/p/1/2.jpg',
                'images/p/1/3.jpg',
                'images/p/1/4.jpg',
                'images/p/1/5.jpg',
                'images/p/1/6.jpg',
                'images/p/1/7.jpg',
                'images/p/1/8.jpg',
                'images/p/1/9.jpg',

            ]
        },
        reviews: {},
        flight: {
            has: false,
            from: 'Moscow'
        }
    },
    {
        id: 2,
        operator: {
            from: 'tui',
            tourOperator: 'tui',
            fromLink: "https://www.tui.ru/AllHotTours/",

        },
        country: 1,
        type: ['beach','hot'],
        header: {

            appearTime: 1495903059532,
            offerFreshness: "green", //blue, yellow, grey, red

            dateFrom: "03.06.17",
            dateTo: "07.06.17",
            duration: 4,
            extLink: "https://www.tui.ru/Tours/Europe/Spain/Barcelona/Costa-Brava/Lloret-De-Mar/Xaine-Park/#?DepartureDate=2017-06-03%7C2017-06-03&AdultCount=2&NightsFrom=4&NightsTo=4",
            rating: "7.4",

            title: "Xaine Park 4*",
            stars: 4,
            country: {id: 1, title: "Испания"},
            region: {id: 1, title: "Коста Брава"},
            city: {id: 1, title: "Льорет Де Мар", type: "city"},

            direction: 'Испания, Коста Брава, Льорет Де Мар',
            subtitle: "Барнаул – Мульта – Нижнее Мультинское озеро – оз.Славных девчат – оз.Поперечное Мультинское – устье Аккема – оз.Ниж.Шавлинское – оз.Верхнее Шавлинское – плато Ештыкёль – пос.Чибит – Барнаул",
            avatar: "images/p/1/0.jpg",
            // durationFrom: 11,
            // durationsTo: 18,
            // routeLength: 250,
            pax: 2,
            info: "Это приключение для опытных туристов. Нам предстоит проделать действительно большой путь по Горам, рекам и бездорожью Горного Алтая. Мы сплавимся по величественной Катуни, уйдём глубоко в горы, преодолеем перевалы, увидим по-настоящему дикую и нетронутую природу Горного Алтая с кристально чистыми реками, озёрами, завораживающими водопадами и «лесными жителями». \nОбратите внимание, предложено 2 варианта программы, различные по стоимости и продолжительности (11 дней и 18 дней).",
        },
        price: {
            total: 22750,
            accommodation: "2AD",
            pax: 2,
            child: undefined,
            currency: {title: "руб.", id: "RUB"},
            include: [
                {id: 1, title: "Питание завтрак"},
                {id: 2, title: "Бесплатный трансфер из аэропорта в отель и обратно"},
                {id: 3, title: "Услуги русскоговорящего гида в течение всего отдыха"},
                {id: 4, title: "Билет"}
            ],
            exclude:[
                {id: 5, title: "Топливный сбор"}, // уточнять сколько может стоить
                {id: 6, title: "Виза"},// уточнять сколько может стоить
                {id: 7, title: "Экскурсии"},
            ]
        },
        body: {
            info: "",
            location: {
                info: "Отель находится в центре Льорет де Мар, в 200 м от пляжа, в двух минутах ходьбы от Казино, от спортивной зоны курорта и его коммерческих и развлекательных центров. ",
                geoLat: undefined,
                geoLong: undefined
            },
            main: {
                info: "Отель состоит из одного 7-этажного здания.\nВсего 190 номеров.",
                habitations: [
                    {id: 1, pax: 2, title: "Standard Double"},
                    {id: 2, pax: 3, title: "Standard Triple"},
                    {id: 3, pax: 4, title: "Quadruple"},
                    {id: 4, pax: 1, title: "Single"}
                ],
                rooms: 190
            },
            meal: {
                info: "Отель предлагает питание по системам: без питания, завтраки, полупансион, полный пансион.",
                mealsItems: [
                    {
                        info: "главный ресторан (местная и международная кухни, кулинарные шоу, тематические ужины)",
                        title: undefined,
                        type: "restaurant",
                        cuisine: ["local", "international"]
                    },
                    {
                        info: "",
                        title: undefined,
                        type: "bar",
                        cuisine: []
                    },
                    {
                        info: "",
                        title: undefined,
                        type: "cafe",
                        cuisine: []
                    }
                ]
            },
            beach: {
                info: "Муниципальный песчаный, в 200 м от отеля через дорогу. ",
                distance: '200m'
            },
            hotelService: [
                {
                    title: "анимация",
                    type: ['entertainment'],
                    alias: ["развлекательные шоу программы"],
                    id: 1
                },
                {
                    title: "баня",
                    type: ['entertainment', 'sport'],
                    id: 2
                },
                {
                    title: "бильярд",
                    type: ['entertainment', 'sport'],
                    id: 3
                },
                {
                    title: "велосипеды",
                    type: ['sport'],
                    id: 4
                },
                {
                    title: "водные развлечения",
                    type: ['entertainment', 'sport'],
                    id: 5
                },
                {
                    title: "гольф",
                    type: ['sport'],
                    id: 6
                }, {
                    title: "джакузи",
                    type: ['entertainment'],
                    id: 7
                }, {
                    title: "дайвинг",
                    type: ['sport'],
                    id: 8
                },
                {
                    title: "дартс",
                    type: ['entertainment', 'sport'],
                    id: 9
                }, {
                    title: "интернет",
                    type: ['entertainment', 'useful'],
                    id: 10
                }, {
                    title: "интернет-кафе",
                    type: ['entertainment', 'useful'],
                    id: 11
                },
                {
                    title: "консьеpж",
                    type: ['entertainment', 'useful'],
                    id: 12
                },
                {
                    title: "наружный бассейн",
                    type: ['entertainment', 'sport'],
                    id: 13
                }, {
                    title: "настольные игры",
                    type: ['entertainment'],
                    id: 14
                },
                {
                    title: "обслуживание в номере",
                    type: ['service'],
                    id: 15
                },
                {
                    title: "оздоровительный центр",
                    type: ['entertainment', 'sport'],
                    id: 16
                },
                {
                    title: "открытый бассейн",
                    type: ['entertainment', 'sport'],
                    id: 17
                },
                {
                    title: "охрана",
                    type: ['security'],
                    id: 18
                }, {
                    title: "петанк",
                    type: ['entertainment', 'sport'],
                    id: 19
                },
                {
                    title: "почта",
                    type: ['useful'],
                    id: 20
                },
                {
                    title: "развлекательные шоу программы",
                    type: ['entertainment'],
                    alias: ["анимация"],
                    id: 21
                },
                {
                    title: "сауна",
                    id: 22
                },
                {
                    title: "солярий",
                    id: 23
                },
                {
                    title: "тренажерный зал",
                    id: 24
                },
                {
                    title: "факс",
                    id: 25
                }, {
                    title: "фитнес-центр",
                    id: 26
                },
                {
                    title: "яхт - клуб",
                    id: 27
                },


                {
                    title: "детский бассейн",
                    id: 101
                },
                {
                    title: "детская анимация",
                    id: 102
                },
                {
                    title: "детская игровая площадка",
                    id: 103
                },
                {
                    title: "детски коляски (платно/депозит)",
                    isPaid: true,
                    forChild: true,
                    id: 104
                },


                {
                    title: "Каждому гостю входной билет с бесплатным напитком в Гран Казино Коста Брава Льорет-де-Мар.",
                    type: ['entertainment', 'additional', 'bonus'],
                    id: 1001
                },

                {
                    title: "ресепшн (24 часа)",
                    type: ['territory'],
                    id: 201
                },

                {
                    title: "обмен валюты",
                    type: ['territory'],
                    id: 202
                },

                {
                    title: "Wi-Fi",
                    type: ['territory'],
                    isPaid: false,
                    id: 203
                },

                {
                    title: "прачечная",
                    type: ['territory'],
                    isPaid: true,
                    id: 204
                },

                {
                    title: "парковка",
                    type: ['territory'],
                    isPaid: true,
                    id: 205
                },

                {
                    title: "терраса для загара",
                    type: ['territory'],
                    id: 206
                },

                {
                    title: "камера для хранения багажа",
                    type: ['territory'],
                    id: 207
                },

                {
                    title: "прокат авто",
                    type: ['territory'],
                    id: 208
                },

                {
                    title: "прокат велосипедов",
                    type: ['territory'],
                    id: 209
                },

                {
                    title: "Chill-out зона",
                    type: ['territory'],
                    id: 210
                }


            ],
            inRoom: [
                {
                    title: "ванная комната",
                    id: 1
                }, {
                    title: "фен",
                    id: 2
                }, {
                    title: "кондиционер",
                    id: 3
                }, {
                    title: "ТВ",
                    id: 4
                }, {
                    title: "Wi-Fi (платно)",
                    isPaid: true,
                    id: 5
                }, {
                    title: "сейф (платно)",
                    isPaid: true,
                    id: 6
                }, {
                    title: "балкон",
                    id: 7
                }

            ],
            additional: {
                withPets: false
            },
            mainImage: 'images/altai/20578.jpg',
            images: ['images/altai/20573.jpg',
                'images/altai/20578.jpg',
                'images/altai/20583.jpg',
                'images/altai/20584.jpg',
                'images/altai/20585.jpg',
                'images/altai/20586.jpg',
                'images/altai/20588.jpg',
                'images/altai/20611.jpg',
                'images/altai/20612.jpg',
                'images/altai/20615.jpg',
                'images/altai/20583.jpg',
                'images/altai/20584.jpg',],

        },
        reviews: {
            total: "3.5",
            tripAdvisor: {
                total: "3.5",
                priceService: "4",
                rooms: "4",
                clean: "3.5",
                service: "3",
                link: "https://www.tripadvisor.ru/Hotel_Review-g494960-d259359-Reviews-Xaine_Park_Hotel-Lloret_de_Mar_Costa_Brava_Province_of_Girona_Catalonia.html#REVIEWS"
            },
            tui: {
                location: 7.5,
                service: 7.5,
                staff: 7.5,
                priceService: 6.5,
                comfort: 7.5,
                design: 5.5,
                meal: 3.5,
                beach: 5.5,
                link: "https://www.tui.ru/Tours/Europe/Spain/Barcelona/Costa-Brava/Lloret-De-Mar/Xaine-Park/?t=responses"
            }
        },
        flight: {
            has: true,
            data:{
                from: 'Moscow',
                flightNum: 'SU 898',
                flightBegin: ''
            }
        }
    },
    {
        id: 3,
        operator: {
            from: '1001tur',
            tourOperator: 'intravel',
            fromLink: "http://www.http://online.intravel.ru/online/default.php?page=the_best",

        },
        country: 2,
        type: ['beach','hot'],
        header: {

            appearTime: 1495903059532,
            offerFreshness: "green", //blue, yellow, grey, red

            dateFrom: "15.06.17",
            dateTo: "22.06.17",
            duration: 7,
            extLink: "http://www.1001tur.ru/tailand/phuket/patong_holiday_plaza/tours/#type=hot&night_from=7&night_to=7",
            rating: "7.4",

            title: "Patong Holiday Plaza 4*",
            stars: 4,
            country: {id: 2, title: "Тайланд"},
            region: {id: 2, title: "Пхукет"},
            city: {id: 2, title: "Пхукет", type: "city"},

            direction: 'Тайланд, Пхукет',
            subtitle: "",
            avatar: "images/p/2/1.jpg",

            pax: 2,
            info: "",
        },
        price: {
            total: 32016,
            accommodation: "2AD",
            pax: 2,
            child: undefined,
            currency: {title: "руб.", id: "RUB"},
            include: [
                {id: 1, title: "Питание завтрак"},
                {id: 2, title: "Бесплатный трансфер из аэропорта в отель и обратно"},
                {id: 3, title: "Услуги русскоговорящего гида в течение всего отдыха"},
                {id: 4, title: "Билет"}
            ],
            exclude:[
                {id: 5, title: "Топливный сбор"}, // уточнять сколько может стоить
                {id: 6, title: "Виза"},// уточнять сколько может стоить
                {id: 7, title: "Экскурсии"},
             ]
        },
        body: {
            info: "",
            location: {
                info: undefined,
                geoLat: undefined,
                geoLong: undefined,
                address: "87/1-4,Sai Kor Road, Patong, Kathu, Phuket 83150, Thailand",

            },
            main: {
                info: `Подходящий выбор для туристов, которые ценят не только качественный, но и доступный по цене отдых – четырехзвездочный спа - отель Patong Holiday Plaza. Эта гостиница была открыта на знаменитом курорте Таиланда – острове Пхукет. Первое, на что обращают внимание остановившиеся тут туристы и о чем оставляют положительные отзывы – это удачное расположение отеля. Он находится всего в 15 минутах ходьбы от знаменитого и любимого отдыхающими пляжа Патонг.

                Для разнообразия можно отправиться на пляж Карон, который регулярно получает немало положительных отзывов от отдыхающих. Он находится в пяти минутах езды от Patong Holiday Plaza. Кроме того, прогулка от этого спа-отеля до ночного рынка займет не больше пяти минут. Здесь туристы могут купить сувениры, которые напомнят им Таиланд уже после отъезда из Пхукета. Постояльцам отеля предоставляется бесплатный трансфер, который доставляет желающих до пляжа Патонг, улицы Бангла, торгового центра Jungceylon.

        Patong Holiday Plaza – это крупная гостиница, в которой туристам готовы предложить 249 номеров, цена на размещение в которых различна. Все они отличаются элегантностью в оформлении, хорошо оборудованы. В комнатах отеля есть современная и удобная мебель, мини-бар, телевизор с плоским экраном, а также сейф, в котором можно хранить ценные вещи. Кроме того, в номерах имеются балконы, выйдя на которые приятно полюбоваться окрестностями.

    В отеле имеется плавательный бассейн, у которого приятно позагорать. В особо солнечные дни можно посидеть в веранде на территории. Гости Patong Holiday Plaza имеют возможность воспользоваться беспроводным интернетом.

    Питание для гостей организуется в двух ресторанах гостиницы, в которых подают блюда интернациональной, а также тайской кухни. Если вы захотите перекусить, можно посетить лаундж-бар или кафе. В последнем предлагают не только напитки, но и выпечку, салаты, десерты.`,
                habitations: [
                    {id: 5, pax: 2, title: "Standard Single"},
                    {id: 6, pax: 3, title: "Standard Double"},
                ],
                rooms: 190
            },
            meal: {
                info: "Отель предлагает питание по системам: без питания, завтраки, полупансион, полный пансион.",
                mealsItems: [
                    {
                        info: "главный ресторан (местная и международная кухни, кулинарные шоу, тематические ужины)",
                        title: undefined,
                        type: "restaurant",
                        cuisine: ["local", "international"]
                    },
                    {
                        info: "",
                        title: undefined,
                        type: "bar",
                        cuisine: []
                    },
                    {
                        info: "",
                        title: undefined,
                        type: "cafe",
                        cuisine: []
                    }
                ]
            },
            beach: {
                info: "Муниципальный песчаный, в 200 м от отеля через дорогу. ",
                distance: '200m'
            },
            hotelService: [
                {
                    title: "анимация",
                    type: ['entertainment'],
                    alias: ["развлекательные шоу программы"],
                    id: 1
                },
                {
                    title: "баня",
                    type: ['entertainment', 'sport'],
                    id: 2
                },
                {
                    title: "бильярд",
                    type: ['entertainment', 'sport'],
                    id: 3
                },
                {
                    title: "велосипеды",
                    type: ['sport'],
                    id: 4
                },
                {
                    title: "водные развлечения",
                    type: ['entertainment', 'sport'],
                    id: 5
                },
                {
                    title: "гольф",
                    type: ['sport'],
                    id: 6
                }, {
                    title: "джакузи",
                    type: ['entertainment'],
                    id: 7
                }, {
                    title: "дайвинг",
                    type: ['sport'],
                    id: 8
                },
                {
                    title: "дартс",
                    type: ['entertainment', 'sport'],
                    id: 9
                }, {
                    title: "интернет",
                    type: ['entertainment', 'useful'],
                    id: 10
                }, {
                    title: "интернет-кафе",
                    type: ['entertainment', 'useful'],
                    id: 11
                },
                {
                    title: "консьеpж",
                    type: ['entertainment', 'useful'],
                    id: 12
                },
                {
                    title: "наружный бассейн",
                    type: ['entertainment', 'sport'],
                    id: 13
                }, {
                    title: "настольные игры",
                    type: ['entertainment'],
                    id: 14
                },
                {
                    title: "обслуживание в номере",
                    type: ['service'],
                    id: 15
                },
                {
                    title: "оздоровительный центр",
                    type: ['entertainment', 'sport'],
                    id: 16
                },
                {
                    title: "открытый бассейн",
                    type: ['entertainment', 'sport'],
                    id: 17
                },
                {
                    title: "охрана",
                    type: ['security'],
                    id: 18
                }, {
                    title: "петанк",
                    type: ['entertainment', 'sport'],
                    id: 19
                },
                {
                    title: "почта",
                    type: ['useful'],
                    id: 20
                },
                {
                    title: "развлекательные шоу программы",
                    type: ['entertainment'],
                    alias: ["анимация"],
                    id: 21
                },
                {
                    title: "сауна",
                    id: 22
                },
                {
                    title: "солярий",
                    id: 23
                },
                {
                    title: "тренажерный зал",
                    id: 24
                },
                {
                    title: "факс",
                    id: 25
                }, {
                    title: "фитнес-центр",
                    id: 26
                },
                {
                    title: "яхт - клуб",
                    id: 27
                },


                {
                    title: "детский бассейн",
                    id: 101
                },
                {
                    title: "детская анимация",
                    id: 102
                },
                {
                    title: "детская игровая площадка",
                    id: 103
                },
                {
                    title: "детски коляски (платно/депозит)",
                    isPaid: true,
                    forChild: true,
                    id: 104
                },


                {
                    title: "Каждому гостю входной билет с бесплатным напитком в Гран Казино Коста Брава Льорет-де-Мар.",
                    type: ['entertainment', 'additional', 'bonus'],
                    id: 1001
                },

                {
                    title: "ресепшн (24 часа)",
                    type: ['territory'],
                    id: 201
                },

                {
                    title: "обмен валюты",
                    type: ['territory'],
                    id: 202
                },

                {
                    title: "Wi-Fi",
                    type: ['territory'],
                    isPaid: false,
                    id: 203
                },

                {
                    title: "прачечная",
                    type: ['territory'],
                    isPaid: true,
                    id: 204
                },

                {
                    title: "парковка",
                    type: ['territory'],
                    isPaid: true,
                    id: 205
                },

                {
                    title: "терраса для загара",
                    type: ['territory'],
                    id: 206
                },

                {
                    title: "камера для хранения багажа",
                    type: ['territory'],
                    id: 207
                },

                {
                    title: "прокат авто",
                    type: ['territory'],
                    id: 208
                },

                {
                    title: "прокат велосипедов",
                    type: ['territory'],
                    id: 209
                },

                {
                    title: "Chill-out зона",
                    type: ['territory'],
                    id: 210
                }


            ],
            inRoom: [
                {
                    title: "ванная комната",
                    id: 1
                }, {
                    title: "фен",
                    id: 2
                }, {
                    title: "кондиционер",
                    id: 3
                }, {
                    title: "ТВ",
                    id: 4
                }, {
                    title: "Wi-Fi (платно)",
                    isPaid: true,
                    id: 5
                }, {
                    title: "сейф (платно)",
                    isPaid: true,
                    id: 6
                }, {
                    title: "балкон",
                    id: 7
                }

            ],
            additional: {
                withPets: false
            },
            mainImage: 'images/altai/20578.jpg',
            images: ['images/altai/20573.jpg',
                'images/altai/20578.jpg',
                'images/altai/20583.jpg',
                'images/altai/20584.jpg',
                'images/altai/20585.jpg',
                'images/altai/20586.jpg',
                'images/altai/20588.jpg',
                'images/altai/20611.jpg',
                'images/altai/20612.jpg',
                'images/altai/20615.jpg',
                'images/altai/20583.jpg',
                'images/altai/20584.jpg',],

        },
        reviews: {
            total: "3.5",
            tripAdvisor: {
                total: "3.5",
                priceService: "4",
                rooms: "4",
                clean: "3.5",
                service: "3",
                link: "https://www.tripadvisor.ru/Hotel_Review-g494960-d259359-Reviews-Xaine_Park_Hotel-Lloret_de_Mar_Costa_Brava_Province_of_Girona_Catalonia.html#REVIEWS"
            },
            tui: {
                location: 7.5,
                service: 7.5,
                staff: 7.5,
                priceService: 6.5,
                comfort: 7.5,
                design: 5.5,
                meal: 3.5,
                beach: 5.5,
                link: "https://www.tui.ru/Tours/Europe/Spain/Barcelona/Costa-Brava/Lloret-De-Mar/Xaine-Park/?t=responses"
            }
        },
        flight: {
            has: true,
            data:{
                from: 'Moscow',
                flightNum: 'SU 898',
                flightBegin: '08:50'
            }

        }
    },
    {
        id: 4,
        operator: {
            from: 'tui',
            tourOperator: 'tui',
            fromLink: "https://www.tui.ru/AllHotTours/",

        },
        country: 1,
        type: ['beach','hot'],
        header: {

            appearTime: 1495903059532,
            offerFreshness: "green", //blue, yellow, grey, red

            dateFrom: "03.06.17",
            dateTo: "07.06.17",
            duration: 4,
            extLink: "https://www.tui.ru/Tours/Europe/Spain/Barcelona/Costa-Brava/Lloret-De-Mar/Xaine-Park/#?DepartureDate=2017-06-03%7C2017-06-03&AdultCount=2&NightsFrom=4&NightsTo=4",
            rating: "7.4",

            title: "Xaine Park 4*",
            stars: 4,
            country: {id: 1, title: "Испания"},
            region: {id: 1, title: "Коста Брава"},
            city: {id: 1, title: "Льорет Де Мар", type: "city"},

            direction: 'Испания, Коста Брава, Льорет Де Мар',
            subtitle: "Барнаул – Мульта – Нижнее Мультинское озеро – оз.Славных девчат – оз.Поперечное Мультинское – устье Аккема – оз.Ниж.Шавлинское – оз.Верхнее Шавлинское – плато Ештыкёль – пос.Чибит – Барнаул",
            avatar: "images/p/1/0.jpg",
            // durationFrom: 11,
            // durationsTo: 18,
            // routeLength: 250,
            pax: 2,
            info: "Это приключение для опытных туристов. Нам предстоит проделать действительно большой путь по Горам, рекам и бездорожью Горного Алтая. Мы сплавимся по величественной Катуни, уйдём глубоко в горы, преодолеем перевалы, увидим по-настоящему дикую и нетронутую природу Горного Алтая с кристально чистыми реками, озёрами, завораживающими водопадами и «лесными жителями». \nОбратите внимание, предложено 2 варианта программы, различные по стоимости и продолжительности (11 дней и 18 дней).",
        },
        price: {
            total: 22750,
            accommodation: "2AD",
            pax: 2,
            child: undefined,
            currency: {title: "руб.", id: "RUB"}
        },
        body: {
            info: "",
            location: {
                info: "Отель находится в центре Льорет де Мар, в 200 м от пляжа, в двух минутах ходьбы от Казино, от спортивной зоны курорта и его коммерческих и развлекательных центров. ",
                geoLat: undefined,
                geoLong: undefined
            },
            main: {
                info: "Отель состоит из одного 7-этажного здания.\nВсего 190 номеров.",
                habitations: [
                    {id: 1, pax: 2, title: "Standard Double"},
                    {id: 2, pax: 3, title: "Standard Triple"},
                    {id: 3, pax: 4, title: "Quadruple"},
                    {id: 4, pax: 1, title: "Single"}
                ],
                rooms: 190
            },
            meal: {
                info: "Отель предлагает питание по системам: без питания, завтраки, полупансион, полный пансион.",
                mealsItems: [
                    {
                        info: "главный ресторан (местная и международная кухни, кулинарные шоу, тематические ужины)",
                        title: undefined,
                        type: "restaurant",
                        cuisine: ["local", "international"]
                    },
                    {
                        info: "",
                        title: undefined,
                        type: "bar",
                        cuisine: []
                    },
                    {
                        info: "",
                        title: undefined,
                        type: "cafe",
                        cuisine: []
                    }
                ]
            },
            beach: {
                info: "Муниципальный песчаный, в 200 м от отеля через дорогу. ",
                distance: '200m'
            },
            hotelService: [
                {
                    title: "анимация",
                    type: ['entertainment'],
                    alias: ["развлекательные шоу программы"],
                    id: 1
                },
                {
                    title: "баня",
                    type: ['entertainment', 'sport'],
                    id: 2
                },
                {
                    title: "бильярд",
                    type: ['entertainment', 'sport'],
                    id: 3
                },
                {
                    title: "велосипеды",
                    type: ['sport'],
                    id: 4
                },
                {
                    title: "водные развлечения",
                    type: ['entertainment', 'sport'],
                    id: 5
                },
                {
                    title: "гольф",
                    type: ['sport'],
                    id: 6
                }, {
                    title: "джакузи",
                    type: ['entertainment'],
                    id: 7
                }, {
                    title: "дайвинг",
                    type: ['sport'],
                    id: 8
                },
                {
                    title: "дартс",
                    type: ['entertainment', 'sport'],
                    id: 9
                }, {
                    title: "интернет",
                    type: ['entertainment', 'useful'],
                    id: 10
                }, {
                    title: "интернет-кафе",
                    type: ['entertainment', 'useful'],
                    id: 11
                },
                {
                    title: "консьеpж",
                    type: ['entertainment', 'useful'],
                    id: 12
                },
                {
                    title: "наружный бассейн",
                    type: ['entertainment', 'sport'],
                    id: 13
                }, {
                    title: "настольные игры",
                    type: ['entertainment'],
                    id: 14
                },
                {
                    title: "обслуживание в номере",
                    type: ['service'],
                    id: 15
                },
                {
                    title: "оздоровительный центр",
                    type: ['entertainment', 'sport'],
                    id: 16
                },
                {
                    title: "открытый бассейн",
                    type: ['entertainment', 'sport'],
                    id: 17
                },
                {
                    title: "охрана",
                    type: ['security'],
                    id: 18
                }, {
                    title: "петанк",
                    type: ['entertainment', 'sport'],
                    id: 19
                },
                {
                    title: "почта",
                    type: ['useful'],
                    id: 20
                },
                {
                    title: "развлекательные шоу программы",
                    type: ['entertainment'],
                    alias: ["анимация"],
                    id: 21
                },
                {
                    title: "сауна",
                    id: 22
                },
                {
                    title: "солярий",
                    id: 23
                },
                {
                    title: "тренажерный зал",
                    id: 24
                },
                {
                    title: "факс",
                    id: 25
                }, {
                    title: "фитнес-центр",
                    id: 26
                },
                {
                    title: "яхт - клуб",
                    id: 27
                },


                {
                    title: "детский бассейн",
                    id: 101
                },
                {
                    title: "детская анимация",
                    id: 102
                },
                {
                    title: "детская игровая площадка",
                    id: 103
                },
                {
                    title: "детски коляски (платно/депозит)",
                    isPaid: true,
                    forChild: true,
                    id: 104
                },


                {
                    title: "Каждому гостю входной билет с бесплатным напитком в Гран Казино Коста Брава Льорет-де-Мар.",
                    type: ['entertainment', 'additional', 'bonus'],
                    id: 1001
                },

                {
                    title: "ресепшн (24 часа)",
                    type: ['territory'],
                    id: 201
                },

                {
                    title: "обмен валюты",
                    type: ['territory'],
                    id: 202
                },

                {
                    title: "Wi-Fi",
                    type: ['territory'],
                    isPaid: false,
                    id: 203
                },

                {
                    title: "прачечная",
                    type: ['territory'],
                    isPaid: true,
                    id: 204
                },

                {
                    title: "парковка",
                    type: ['territory'],
                    isPaid: true,
                    id: 205
                },

                {
                    title: "терраса для загара",
                    type: ['territory'],
                    id: 206
                },

                {
                    title: "камера для хранения багажа",
                    type: ['territory'],
                    id: 207
                },

                {
                    title: "прокат авто",
                    type: ['territory'],
                    id: 208
                },

                {
                    title: "прокат велосипедов",
                    type: ['territory'],
                    id: 209
                },

                {
                    title: "Chill-out зона",
                    type: ['territory'],
                    id: 210
                }


            ],
            inRoom: [
                {
                    title: "ванная комната",
                    id: 1
                }, {
                    title: "фен",
                    id: 2
                }, {
                    title: "кондиционер",
                    id: 3
                }, {
                    title: "ТВ",
                    id: 4
                }, {
                    title: "Wi-Fi (платно)",
                    isPaid: true,
                    id: 5
                }, {
                    title: "сейф (платно)",
                    isPaid: true,
                    id: 6
                }, {
                    title: "балкон",
                    id: 7
                }

            ],
            additional: {
                withPets: false
            },
            mainImage: 'images/altai/20578.jpg',
            images: ['images/altai/20573.jpg',
                'images/altai/20578.jpg',
                'images/altai/20583.jpg',
                'images/altai/20584.jpg',
                'images/altai/20585.jpg',
                'images/altai/20586.jpg',
                'images/altai/20588.jpg',
                'images/altai/20611.jpg',
                'images/altai/20612.jpg',
                'images/altai/20615.jpg',
                'images/altai/20583.jpg',
                'images/altai/20584.jpg',],

        },
        reviews: {
            total: "3.5",
            tripAdvisor: {
                total: "3.5",
                priceService: "4",
                rooms: "4",
                clean: "3.5",
                service: "3",
                link: "https://www.tripadvisor.ru/Hotel_Review-g494960-d259359-Reviews-Xaine_Park_Hotel-Lloret_de_Mar_Costa_Brava_Province_of_Girona_Catalonia.html#REVIEWS"
            },
            tui: {
                location: 7.5,
                service: 7.5,
                staff: 7.5,
                priceService: 6.5,
                comfort: 7.5,
                design: 5.5,
                meal: 3.5,
                beach: 5.5,
                link: "https://www.tui.ru/Tours/Europe/Spain/Barcelona/Costa-Brava/Lloret-De-Mar/Xaine-Park/?t=responses"
            }
        },
        flight: {
            has: true,
            data:{}
        }
    },
    {
        id: 5,
        operator: {
            from: '1001tur',
            tourOperator: 'tui',
            fromLink: "http://www.1001tur.ru/hot/",

        },
        country: 2,
        type: ['beach','hot'],
        header: {

            appearTime: 1495903059532,
            offerFreshness: "green", //blue, yellow, grey, red

            dateFrom: "15.06.17",
            dateTo: "22.06.17",
            duration: 7,
            extLink: "http://www.1001tur.ru/tailand/phuket/patong_holiday_plaza/tours/#type=hot&night_from=7&night_to=7",
            rating: "7.4",

            title: "Patong Holiday Plaza 4*",
            stars: 4,
            country: {id: 1, title: "Тайланд"},
            region: {id: 1, title: "Пхукет"},
            city: {id: 1, title: "Пхукет", type: "city"},

            direction: 'Тайланд, Пхукет',
            subtitle: "",
            avatar: "images/p/2/1.jpg",

            pax: 2,
            info: "",
        },
        price: {
            total: 32016,
            accommodation: "2AD",
            pax: 2,
            child: undefined,
            currency: {title: "руб.", id: "RUB"},
            include: [
                {id: 1, title: "Питание завтрак"},
                {id: 2, title: "Бесплатный трансфер из аэропорта в отель и обратно"},
                {id: 3, title: "Услуги русскоговорящего гида в течение всего отдыха"},
                {id: 4, title: "Билет"}
            ],
            exclude:[
                {id: 5, title: "Топливный сбор"}, // уточнять сколько может стоить
                {id: 6, title: "Виза"},// уточнять сколько может стоить
                {id: 7, title: "Экскурсии"},
            ]
        },
        body: {
            info: "",
            location: {
                info: undefined,
                geoLat: undefined,
                geoLong: undefined,
                address: "87/1-4,Sai Kor Road, Patong, Kathu, Phuket 83150, Thailand",

            },
            main: {
                info: `Подходящий выбор для туристов, которые ценят не только качественный, но и доступный по цене отдых – четырехзвездочный спа - отель Patong Holiday Plaza. Эта гостиница была открыта на знаменитом курорте Таиланда – острове Пхукет. Первое, на что обращают внимание остановившиеся тут туристы и о чем оставляют положительные отзывы – это удачное расположение отеля. Он находится всего в 15 минутах ходьбы от знаменитого и любимого отдыхающими пляжа Патонг.

                Для разнообразия можно отправиться на пляж Карон, который регулярно получает немало положительных отзывов от отдыхающих. Он находится в пяти минутах езды от Patong Holiday Plaza. Кроме того, прогулка от этого спа-отеля до ночного рынка займет не больше пяти минут. Здесь туристы могут купить сувениры, которые напомнят им Таиланд уже после отъезда из Пхукета. Постояльцам отеля предоставляется бесплатный трансфер, который доставляет желающих до пляжа Патонг, улицы Бангла, торгового центра Jungceylon.

        Patong Holiday Plaza – это крупная гостиница, в которой туристам готовы предложить 249 номеров, цена на размещение в которых различна. Все они отличаются элегантностью в оформлении, хорошо оборудованы. В комнатах отеля есть современная и удобная мебель, мини-бар, телевизор с плоским экраном, а также сейф, в котором можно хранить ценные вещи. Кроме того, в номерах имеются балконы, выйдя на которые приятно полюбоваться окрестностями.

    В отеле имеется плавательный бассейн, у которого приятно позагорать. В особо солнечные дни можно посидеть в веранде на территории. Гости Patong Holiday Plaza имеют возможность воспользоваться беспроводным интернетом.

    Питание для гостей организуется в двух ресторанах гостиницы, в которых подают блюда интернациональной, а также тайской кухни. Если вы захотите перекусить, можно посетить лаундж-бар или кафе. В последнем предлагают не только напитки, но и выпечку, салаты, десерты.`,
                habitations: [
                    {id: 5, pax: 2, title: "Standard Single"},
                    {id: 6, pax: 3, title: "Standard Double"},
                ],
                rooms: 190
            },
            meal: {
                info: "Отель предлагает питание по системам: без питания, завтраки, полупансион, полный пансион.",
                mealsItems: [
                    {
                        info: "главный ресторан (местная и международная кухни, кулинарные шоу, тематические ужины)",
                        title: undefined,
                        type: "restaurant",
                        cuisine: ["local", "international"]
                    },
                    {
                        info: "",
                        title: undefined,
                        type: "bar",
                        cuisine: []
                    },
                    {
                        info: "",
                        title: undefined,
                        type: "cafe",
                        cuisine: []
                    }
                ]
            },
            beach: {
                info: "Муниципальный песчаный, в 200 м от отеля через дорогу. ",
                distance: '200m'
            },
            hotelService: [
                {
                    title: "анимация",
                    type: ['entertainment'],
                    alias: ["развлекательные шоу программы"],
                    id: 1
                },
                {
                    title: "баня",
                    type: ['entertainment', 'sport'],
                    id: 2
                },
                {
                    title: "бильярд",
                    type: ['entertainment', 'sport'],
                    id: 3
                },
                {
                    title: "велосипеды",
                    type: ['sport'],
                    id: 4
                },
                {
                    title: "водные развлечения",
                    type: ['entertainment', 'sport'],
                    id: 5
                },
                {
                    title: "гольф",
                    type: ['sport'],
                    id: 6
                }, {
                    title: "джакузи",
                    type: ['entertainment'],
                    id: 7
                }, {
                    title: "дайвинг",
                    type: ['sport'],
                    id: 8
                },
                {
                    title: "дартс",
                    type: ['entertainment', 'sport'],
                    id: 9
                }, {
                    title: "интернет",
                    type: ['entertainment', 'useful'],
                    id: 10
                }, {
                    title: "интернет-кафе",
                    type: ['entertainment', 'useful'],
                    id: 11
                },
                {
                    title: "консьеpж",
                    type: ['entertainment', 'useful'],
                    id: 12
                },
                {
                    title: "наружный бассейн",
                    type: ['entertainment', 'sport'],
                    id: 13
                }, {
                    title: "настольные игры",
                    type: ['entertainment'],
                    id: 14
                },
                {
                    title: "обслуживание в номере",
                    type: ['service'],
                    id: 15
                },
                {
                    title: "оздоровительный центр",
                    type: ['entertainment', 'sport'],
                    id: 16
                },
                {
                    title: "открытый бассейн",
                    type: ['entertainment', 'sport'],
                    id: 17
                },
                {
                    title: "охрана",
                    type: ['security'],
                    id: 18
                }, {
                    title: "петанк",
                    type: ['entertainment', 'sport'],
                    id: 19
                },
                {
                    title: "почта",
                    type: ['useful'],
                    id: 20
                },
                {
                    title: "развлекательные шоу программы",
                    type: ['entertainment'],
                    alias: ["анимация"],
                    id: 21
                },
                {
                    title: "сауна",
                    id: 22
                },
                {
                    title: "солярий",
                    id: 23
                },
                {
                    title: "тренажерный зал",
                    id: 24
                },
                {
                    title: "факс",
                    id: 25
                }, {
                    title: "фитнес-центр",
                    id: 26
                },
                {
                    title: "яхт - клуб",
                    id: 27
                },


                {
                    title: "детский бассейн",
                    id: 101
                },
                {
                    title: "детская анимация",
                    id: 102
                },
                {
                    title: "детская игровая площадка",
                    id: 103
                },
                {
                    title: "детски коляски (платно/депозит)",
                    isPaid: true,
                    forChild: true,
                    id: 104
                },


                {
                    title: "Каждому гостю входной билет с бесплатным напитком в Гран Казино Коста Брава Льорет-де-Мар.",
                    type: ['entertainment', 'additional', 'bonus'],
                    id: 1001
                },

                {
                    title: "ресепшн (24 часа)",
                    type: ['territory'],
                    id: 201
                },

                {
                    title: "обмен валюты",
                    type: ['territory'],
                    id: 202
                },

                {
                    title: "Wi-Fi",
                    type: ['territory'],
                    isPaid: false,
                    id: 203
                },

                {
                    title: "прачечная",
                    type: ['territory'],
                    isPaid: true,
                    id: 204
                },

                {
                    title: "парковка",
                    type: ['territory'],
                    isPaid: true,
                    id: 205
                },

                {
                    title: "терраса для загара",
                    type: ['territory'],
                    id: 206
                },

                {
                    title: "камера для хранения багажа",
                    type: ['territory'],
                    id: 207
                },

                {
                    title: "прокат авто",
                    type: ['territory'],
                    id: 208
                },

                {
                    title: "прокат велосипедов",
                    type: ['territory'],
                    id: 209
                },

                {
                    title: "Chill-out зона",
                    type: ['territory'],
                    id: 210
                }


            ],
            inRoom: [
                {
                    title: "ванная комната",
                    id: 1
                }, {
                    title: "фен",
                    id: 2
                }, {
                    title: "кондиционер",
                    id: 3
                }, {
                    title: "ТВ",
                    id: 4
                }, {
                    title: "Wi-Fi (платно)",
                    isPaid: true,
                    id: 5
                }, {
                    title: "сейф (платно)",
                    isPaid: true,
                    id: 6
                }, {
                    title: "балкон",
                    id: 7
                }

            ],
            additional: {
                withPets: false
            },
            mainImage: 'images/altai/20578.jpg',
            images: ['images/altai/20573.jpg',
                'images/altai/20578.jpg',
                'images/altai/20583.jpg',
                'images/altai/20584.jpg',
                'images/altai/20585.jpg',
                'images/altai/20586.jpg',
                'images/altai/20588.jpg',
                'images/altai/20611.jpg',
                'images/altai/20612.jpg',
                'images/altai/20615.jpg',
                'images/altai/20583.jpg',
                'images/altai/20584.jpg',],

        },
        reviews: {
            total: "3.5",
            tripAdvisor: {
                total: "3.5",
                priceService: "4",
                rooms: "4",
                clean: "3.5",
                service: "3",
                link: "https://www.tripadvisor.ru/Hotel_Review-g494960-d259359-Reviews-Xaine_Park_Hotel-Lloret_de_Mar_Costa_Brava_Province_of_Girona_Catalonia.html#REVIEWS"
            },
            tui: {
                location: 7.5,
                service: 7.5,
                staff: 7.5,
                priceService: 6.5,
                comfort: 7.5,
                design: 5.5,
                meal: 3.5,
                beach: 5.5,
                link: "https://www.tui.ru/Tours/Europe/Spain/Barcelona/Costa-Brava/Lloret-De-Mar/Xaine-Park/?t=responses"
            }
        },
        flight: {
            has: false,
            data: {}
        }
    },

];

class RegionsTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    submitForm(e) {
        e.preventDefault()

        console.log('HERE')
        this.props.selectNewOffer('@alex123', this.input.value, Date.now())
        this.input.value = ''
    }

    render() {
        return (
            <div style={{flexGrow: 1}}>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    <Tab icon={<Sunny />}
                         label="Пляжный" value={0}/>
                    <Tab icon={<Business />}
                         label="Городской" value={1}/>
                    <Tab icon={<Landscape />} label="Горный" value={2}/>
                    <Tab icon={<Star />} label="Активный" value={3}/>
                    <Tab icon={<Beach />} label="Экскурсионный" value={4}/>
                    <Tab icon={<People />} label="Выходного дня" value={5}/>
                    <Tab icon={<Bus />} label="Экскурсионный" value={6}/>
                    <Tab icon={<FontAwesome name='child' />} label="С детьми" value={7} />

                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}

                >
                    <div style={{
                        display: "flex",
                        alignContent: "start",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        justifyItems: "start"
                    }}>


                        {cardItems.map((item) => {
                            return (

                                <OfferCard key={item.id}
                                           item={item}

                                />


                            )
                        })}


                    </div>
                    <div style={styles.slide}>

                        <form onSubmit={this.submitForm.bind(this)} action="#">
                            {/*{this.props.messages.map(m => {*/}
                                {/*const d = new Date(m.datetime)*/}
                                {/*return (*/}
                                    {/*<p key={m.datetime} className="message">*/}
                                        {/*<span className="message__date">{`${d.getDate()}/${d.getMonth()} ${d.getHours()}:${d.getMinutes()}`}</span>*/}
                                        {/*<span className="message__author">{m.author}: </span>*/}
                                        {/*<span>{m.text}</span>*/}
                                    {/*</p>*/}
                                {/*)*/}
                            {/*})}*/}
                            <input ref={(input) => this.input = input} type="text" className="chat__input" />
                        </form>

                        <h2 style={styles.headline}>Baikal</h2>
                    </div>
                    <div style={styles.slide}>
                        <h2 style={styles.headline}>Crimea</h2>
                    </div>
                    <div style={styles.slide}>
                        <h2 style={styles.headline}>Kamchatka</h2>
                    </div>
                    <div style={styles.slide}>
                        <h2 style={styles.headline}>Excursions</h2>
                    </div>
                    <div style={styles.slide}>
                        <h2 style={styles.headline}>people</h2>
                    </div>
                    <div style={styles.slide}>
                        <h2 style={styles.headline}>people</h2>
                    </div>
                    <div style={styles.slide}>
                        <h2 style={styles.headline}>people</h2>
                    </div>
                </SwipeableViews>
            </div>
        );
    }
}




const mapStateToProps = (state) => {
    return {
        offers: state.offersReducer
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         dispatch
//     }
// }


const mapDispatchToProps = (dispatch) => {
    return {
        // addNewUser: bindActionCreators(addNewUser, dispatch),
        // newMessage: bindActionCreators(newMessage, dispatch),
        selectNewOffer: bindActionCreators(selectNewOffer, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegionsTabs)

// export default RegionsTabs;



