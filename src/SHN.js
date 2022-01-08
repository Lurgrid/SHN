"use strict";
import event from 'events'
import got from 'got'

export class Client extends event {
    History = true
    async run(){
        const sleep = async (ms) => await new Promise(r => setTimeout(r, ms));
        //--- Initializations of the history of the stories ---
        let res = await this.ListStory()
        while(res == true) res = await this.ListStory()
        this.History = res
        //--- Initializations of the history of the stories ---
        this.emit("ready")
        // -- Infinite loop every x seconds it will fetch new stories --
        for( ; ; ){
            const NewSto = await this.Verif()
            if(NewSto != true){
                for(const sto of NewSto){
                    let Data = await this.StoryData(sto)
                    if(Data != true){
                        this.emit("NewStory", Data)
                    }
                }
            }
            await sleep(15000)
        }
        // -- Infinite loop every x seconds it will fetch new stories --
        
    }
    async ListStory() {
        const res = await got("https://hacker-news.firebaseio.com/v0/newstories.json").json().catch(err => {})
        if (res == undefined){
            return true
        }else{
            return res.slice(0, 2)
        }
    }
    async StoryData(sto) {
        const res = await got(`https://hacker-news.firebaseio.com/v0/item/${sto}.json`).json().catch(err => {})
        if (res == undefined){
            return true
        }else{
            return res
        }
    }
    async Verif(){
        const res = await this.ListStory()
            if(res != true && res.join("-") != this.History.join("-")){
                if(!this.History.includes(res[0]) && this.History.includes(res[1])){
                    this.History = [res[0], res[1]]
                    return [res[0]];
                }else if(!this.History.includes(res[1])){
                    this.History = [res[0], res[1]]
                    return res;
                }
            }
            return true
    }

}