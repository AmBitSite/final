import data from './data.json';

let storageName;
for(let key in localStorage){
    let x = localStorage.getItem(`${key}`)
    if(x!==null){
        let arr = JSON.parse(`${localStorage.getItem(key)}`)
        if(arr!==null)if(arr.save === true)storageName = arr.name
    }
}
let store = {
    setSong(){
        return this.sort()
    },
    wrapSong:[
    ],
    reatingTrack:{
    },
    user:{},
    _currentSong: {
        src: '',
        player: '',
        status: false,
        author: '',
        nextSong: '',
        song: '',
        prevSong: '',
        time:'0',
        currentTime:'00:00',
        progressBar:'',
        visPage :'',
        repeat:'All',
        randomTrack:false,
        magicNumber:''
    },
    _user:{
        name: storageName || '',
        password:'',
        save:'',
        currentTrack:'',
        imgProfile:'https://thequestion.s3.eu-central-1.amazonaws.com/212/647088-54fe466f.jpeg',
        lastTrack:'',
        validInput: true,
        counter : 1,
        welcome:''
    },
    _reRenderDOM() {
        console.log('mistake')
    },
    _addClass() {
        let remove = document.querySelector('.activeSong')
        if (remove !== null) {
            remove.classList.remove('activeSong')
            if (arguments[0] === this._currentSong.song)this._currentSong.song = this._currentSong.nextSong
            else if (arguments[0] === this._currentSong.prevSong)this._currentSong.song = this._currentSong.prevSong
            this._currentSong.song.classList.add('activeSong')
            this._addLastTrackInStorageUser(this._currentSong.song.innerText)
            this._user.currentTrack = this._currentSong.song
            let storageReating = JSON.parse(localStorage.getItem('reating')) || this.reatingTrack
            this.reatingTrack = storageReating
                if(this.reatingTrack.hasOwnProperty(`${this._currentSong.song.innerText}`)){
                    this.reatingTrack[`${this._currentSong.song.innerText}`] = this.reatingTrack[`${this._currentSong.song.innerText}`]+=1;
                }
                else{
                    this.reatingTrack[`${this._currentSong.song.innerText}`]= this._user.counter;
                }
            localStorage.setItem('reating',`${JSON.stringify(this.reatingTrack)}`)
        }
    },
    _setCurrentSongPagam(elem) {
        this._currentSong.author = elem.innerText.split('-')[0]
        this._currentSong.src = elem.getAttribute('src')
        this._currentSong.status = 'true'
        this._currentSong.prevSong = elem.previousSibling
        this._currentSong.nextSong = elem.nextSibling
        this._currentSong.player.src = this._currentSong.src
    },
    elemAudio(elem) {
        this._currentSong.player = elem
    },
    subscribe(observer) {
        this._reRenderDOM = observer
    },
    MenuActiveItem(e) {
        this._currentSong.song = e
        this._addClass()
        this._setCurrentSongPagam(e)
    },
    getWrappSongs(ul) {
        this._currentSong.listSong = ul
        this._currentSong.song = this._currentSong.song || ul.children[0]   
        this._currentSong.song.classList.add('activeSong')
    },
    repeat(value){
        this._currentSong.repeat = value
    },
    nextTrack() {
        this.generator(this._currentSong.randomTrack)
        if(this._currentSong.repeat === 'One'){
            this._currentSong.nextSong = this._currentSong.song
            this._currentSong.prevSong = this._currentSong.song
            this.changeStatus(true)
        }
        else if(this._currentSong.nextSong!==''){
            this._addClass(this._currentSong.song)
            this._setCurrentSongPagam(this._currentSong.song)
            this.changeStatus(true)
        }
        else if(this._currentSong.nextSong ==null){
            if(this._currentSong.repeat === 'All')this._currentSong.nextSong = this._currentSong.listSong.children[0]
        }
    },
    generator(e){
        let magicNumber = Math.floor(Math.random()*this._currentSong.listSong.children.length)
        this._currentSong.randomTrack = e
        if(e)this._currentSong.nextSong = this._currentSong.listSong.children[magicNumber]
    },
    prevTrack() {
        if(this._currentSong.prevSong!==null && this._currentSong.prevSong!==''){
            this._addClass(this._currentSong.prevSong)
            this._setCurrentSongPagam(this._currentSong.song)
            this.changeStatus(true)
        }
    },
    getBio() {
        let nameAuthor = this._currentSong.author || 'Eminem'
        return this.bio[nameAuthor]
    },
    getSrc() {
        return this._currentSong.player.src || ''
    },
    setTime(time, duraion){
        this._currentSong.time = time
        let x = parseInt(duraion)
        this._currentSong.durationTrack = parseInt(duraion)
        if(x === time)this.nextTrack()
        this._reRenderDOM()
    },
    getTime(){
        let sec = this._currentSong.time,
        curMin = Math.floor(sec / 60),
        curSec = Math.floor(sec % 60)
        
        let beautifulTime = curMin + ':' + ('0' + curSec).slice(-2)
        this._currentSong.currentTime = beautifulTime
        return this._currentSong.currentTime
    },
    fullTimeTrack(){
        let sec = this._currentSong.durationTrack,
        curMin = Math.floor(sec / 60),
        curSec = Math.floor(sec % 60)
        if(!isNaN(this._currentSong.durationTrack)){
            let beautifulTime = curMin + ':' + ('0' + curSec).slice(-2)
            return beautifulTime
        } else return '0:00'
    },
    changeStatus(status) {
        this._currentSong.status = status;
        let player = this._currentSong.player
        if(status){
            let playPromise = player.play();
            if (playPromise !== undefined && playPromise !== null) {
                playPromise
                    .then(()=> player.play())
                    .catch(()=> {
                        this._currentSong.nextSong = this._currentSong.song.nextSibling
                        player.setAttribute('src', `${this._currentSong.song.getAttribute('src')}`)
                        player.setAttribute('autoplay', 'true')
                    })
              }
        }
        else{
            this._currentSong.player.pause()
        }
    },
    getStatus() {
        return this._currentSong.status
    },
    changeValume(e){
        this._currentSong.player.volume = e 
    },
    forward(e){
        let percent = (100 / this._currentSong.durationTrack)*this._currentSong.time
        this._currentSong.progressBar = e
        this._currentSong.progressBar.children[0].style.width = `${percent}%`
    },
    refreshThePage(e){
        this._user.save = e
        if(e ==='false'){
            let arr = this.getUserinStorage()
            arr.save = e
            this.setUserToStorage(this._user.name, arr)
            window.location.replace(window.location.origin)
        }
    },
    sort(e){
        let test = this.song;
        let test2 = e;
        if(e !== undefined){
            this.wrapSong.length =0;
            for(let i = 0, j = test.length; i<j;i++){
                let xx = test[i];
                for(let key in xx){
                    if(xx[key] ===test2){
                        this.wrapSong.push(xx)
                    }
                }
            }
        }
        else{
            this.wrapSong.length = 0;
            for(let i = 0,j=this.song.length;i<j;i++){
                this.wrapSong.push(this.song[i])
            }
        }
        return this.wrapSong
    },
    setUserImg(e){
        let arr = this.getUserinStorage()
        arr.imgProfile = e 
        this.setUserToStorage(this._user.name, arr)
    },
    pasreReatig(){
        let storageReating = JSON.parse(localStorage.getItem('reating'))
        let reating;
        let newMutationReating =[];
        for(let key in storageReating){
            let storageReatingItem={}
            reating = storageReating[key]
            storageReatingItem.name = key;
            storageReatingItem.reating = `${reating}`;
            newMutationReating.push(storageReatingItem)
        }
        this._reatingTrack = JSON.parse(localStorage.getItem('reating'))
        return newMutationReating
    },
    setUser(name, pass, remember, visPage){
        this.user.name = this._user.name = name
        this.user.password = this._user.password = pass
        this.user.save = this._user.save = remember
        this._currentSong.visPage = visPage
    },
    _addLastTrackInStorageUser(elem){
        let arr = this.getUserinStorage()
        arr.lastTrack = elem
        this.setUserToStorage(this._user.name, arr)
    },
    returnUserInStorage(){
        let arr = this.getUserinStorage() || this._user
        return arr
    },
    setUserToStorage(user, array){
        localStorage.setItem(`${user}`,`${JSON.stringify(array)}`);
    },
    getUserinStorage(){
        let arr = JSON.parse(`${localStorage.getItem(`${this._user.name}`)}`)
        return arr
    },
    checkValidInput(messageError){
        let arrName = this._user.name.split(''),
            arrPass = this._user.password.split(''),
            arrNameIsNaN = true,
            eXpName=/^[a-zA-Z]+$/,
            eXpPass =/^[0-9a-zA-Z]+$/
        function checkValidInput(input, regExp){
            for(let i = 0, j = input.length; i<j; i++){
                let checkValid = input[i].search(regExp)
                if(checkValid === -1){
                    arrNameIsNaN = false
                    messageError.style.display = 'block'
                }
            }
        }
        checkValidInput(arrName, eXpName)
        checkValidInput(arrPass, eXpPass)
        if(arrNameIsNaN && arrName.length>=2 && arrPass.length>=5){
            let test = localStorage.getItem(`${this._user.name}`)
            if(test !==null){
                let arr = JSON.parse(`${localStorage.getItem(`${this._user.name}`)}`)
                if(arr.name === this._user.name){
                    if(arr.password === this._user.password){
                        this.user.imgProfile = arr.imgProfile
                        this._currentSong.visPage.style.display = 'none'
                        arr.save = this._user.save
                        localStorage.setItem(`${this._user.name}`, `${JSON.stringify(this.user)}`)
                    }
                    else{
                        this._currentSong.visPage.style.display = 'flex';
                        alert('имя уже существует')
                        window.location.replace(window.location.origin)
                    }
                }
                else{
                    this.user.imgProfile = 'https://thequestion.s3.eu-central-1.amazonaws.com/212/647088-54fe466f.jpeg'
                }
            }
            else{
                localStorage.setItem(`${this._user.name}`, `${JSON.stringify(this.user)}`)
                this._currentSong.visPage.style.display = 'none';
            }
        }
        else messageError.style.display = 'block'
    },
    welcome(e){
        this._user.welcome = e
    },
    getWelcome(){
        return this._user.welcome
    },
}

store.song = data.song;
store.bio = data.bio;
export default store;