const logo = document.querySelector('#imgLogo');
const img = 'https://images.icon-icons.com/2428/PNG/512/steam_black_logo_icon_147078.png';

const setLogo = () => {
    console.log('Inicia Funcion')
    setTimeout(()=>{
    logo.setAttribute('src', img);
}, 2000)


};

window.addEventListener('load', setLogo);
