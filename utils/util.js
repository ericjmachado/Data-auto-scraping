const request = require('request');
const cheerio = require('cheerio');

const urlBase = 'https://www.carrosnaweb.com.br';

module.exports = {
    getPage: (index) => {
        return `${urlBase}/catalogo.asp?curpage=${index}&proced=0&zerokm=false&anoini=1954&anofim=2020&valini=0&valfim=100000000&Ordem=1&porte=0&config=0&cilini=&cilfim=&fabricante=Todos&combustivel=0&cambio=0&tracao=0&varnome=&aspiracao=0&eq01=&eq02=&eq04=&eq09=&eq10=&eq11=&eq12=&eq13=&eq14=&eq15=&eq16=&eq18=&eq19=&eq20=&eq21=&eq22=&eq24=&eq25=&eq26=&eq26=&eq27=&eq28=&eq29=&eq30=&eq31=&eq33=&eq34=&eq77=&eq110=&eq84=&eq82=&eq37=&eq39=&eq40=&eq41=&eq38=&eq42=&eq43=&eq44=&eq46=&eq49=&eq53=&eq100=&eq60=&eq86=&eq65=&eq68=&eq69=&eq75=&eq78=&eq79=&eq80=&eq81=&eq85=&eq59=&passageiros=&acionamentocomando=0&alimentacao=0&portamalas=&seguromax=&potenciamin=&potenciamax=&torquemin=&torquemax=&suspensaodianteira=&suspensaotraseira=&freiosdianteiros=0&freiostraseiros=0&direcao=0&portas=&cilindrosquantidade=0&cilindrosdisposicao=0&valvulascilindro=0&tucho=0&embreagem=0&variadorfase=0&tanque=&marchas=&cx=&pesomax=&pesopotmin=&pesopotmax=&pesotorqmin=&pesotorqmax=&codigoMotor=`;
    },
    getSelectorCarsTopics: 'body > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(3) > table > tbody',
    getMaxRangePagination: ($) => {
        const selector = 'body > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(3) > table > tbody > tr:nth-child(22) > td > table > tbody > tr > td:nth-child(3) > font'
        const text = $(selector).text();
        return text.split(' ')[4];
    },
    getCheerioTableByIndexHomePage: (index) => {
        const selector = 'body > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(3) > table > tbody'
        const url = `${urlBase}/catalogo.asp?curpage=${index}&proced=0&zerokm=false&anoini=1954&anofim=2020&valini=0&valfim=100000000&Ordem=1&porte=0&config=0&cilini=&cilfim=&fabricante=Todos&combustivel=0&cambio=0&tracao=0&varnome=&aspiracao=0&eq01=&eq02=&eq04=&eq09=&eq10=&eq11=&eq12=&eq13=&eq14=&eq15=&eq16=&eq18=&eq19=&eq20=&eq21=&eq22=&eq24=&eq25=&eq26=&eq26=&eq27=&eq28=&eq29=&eq30=&eq31=&eq33=&eq34=&eq77=&eq110=&eq84=&eq82=&eq37=&eq39=&eq40=&eq41=&eq38=&eq42=&eq43=&eq44=&eq46=&eq49=&eq53=&eq100=&eq60=&eq86=&eq65=&eq68=&eq69=&eq75=&eq78=&eq79=&eq80=&eq81=&eq85=&eq59=&passageiros=&acionamentocomando=0&alimentacao=0&portamalas=&seguromax=&potenciamin=&potenciamax=&torquemin=&torquemax=&suspensaodianteira=&suspensaotraseira=&freiosdianteiros=0&freiostraseiros=0&direcao=0&portas=&cilindrosquantidade=0&cilindrosdisposicao=0&valvulascilindro=0&tucho=0&embreagem=0&variadorfase=0&tanque=&marchas=&cx=&pesomax=&pesopotmin=&pesopotmax=&pesotorqmin=&pesotorqmax=&codigoMotor=`;
        request(url , function (error, response, html) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                return $(selector);
            }
        });
    }
}