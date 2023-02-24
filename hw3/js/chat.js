window.onload = function(){

    
    const record = document.querySelector('.record');
    const stop = document.querySelector('.stop');
    const soundClips = document.querySelector('.msgs');
    const mainSection = document.querySelector('.form-container');

    stop.disable = true;

    if(navigator.mediaDevices.getUserMedia){
        console.log('getUserMedia supported');

        const constraints = { audio: true};

        let chunks = [];

        let onSuccess = function(stream){
            const mediaRecorder = new MediaRecorder(stream);

            record.onclick = function(){
                mediaRecorder.start();
                console.log(mediaRecorder.state);
                
                //record.style.background = "red";

                record.style.display = "none";
                stop.style.display = "block";
                stop.disable = false;
                record.disable = true;
            }

            stop.onclick = function(){
                
                console.log(mediaRecorder.state);
                
                //record.style.background = "";
                //record.style.color = "";

                stop.style.display = "none";
                record.style.display = "block";
                stop.disable = true;
                record.disable = false;
                mediaRecorder.stop();

            }

            mediaRecorder.onstop = function(e){
                console.log("data avilable after MediaRecorder.stop called.");

                //const clipName = prompt('Enter a name for your sound clip?','My unnamed clip');
            
                const clipContainer = document.createElement('article');
                //const clipLabel = document.createElement('p');
                const audio = document.createElement('audio');
                //const deleteButton = document.createElement('button');

                audio.setAttribute('controls','');
                //deleteButton.textContent = 'Delete';

                /*if(clipName === null){
                    clipLabel.textContent = 'My unnamed clip';

                }else{
                    clipLabel.textContent = clipName;
                }*/
                clipContainer.classList.add("clipContainer");
                audio.classList.add("AudioMSG");
                clipContainer.appendChild(audio);
                //clipContainer.appendChild(clipLabel);
                //clipContainer.appendChild(deleteButton);

                soundClips.appendChild(clipContainer);

                audio.controls = true;
                const blob = new Blob(chunks,{'type':'audio/ogg; codecs=opus'});
                chunks = [];
                const audioURL = window.URL.createObjectURL(blob);
                audio.src = audioURL;
                console.log("recorder stopped");        

                /*deleteButton.onClick = function(e){
                    let evtTgt = e.target;
                    evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
                }*/

                /*clipLabel.onclick = function(){
                    const existingName = clipLabel.textContent;
                    const newClipName = prompt('Enter a new name for your sound clip?');
                    if(newClipName === null){
                        clipLabel.textContent = existingName;
                    }else{
                        clipLabel.textContent = newClipName;
                    }
                }*/
            }

            mediaRecorder.ondataavailable = function(e){
                chunks.push(e.data);
            }

        
        }

        let onError = function(err){
            console.log('The following error occured:' + err);
        };

        navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
    }
    else {
        console.log('getUserMedia not supported on your browser!');
    }

    

    function checkMSG(text, parent) {

        if(text.indexOf("Привет")!=-1 || text.indexOf("привет")!=-1){
            createAnswer("Привет! Рад что ты зашел на мой сайт!", parent);
        }
        else if(text.indexOf("как дела")!=-1 || text.indexOf("Как дела")!=-1){
            createAnswer("У меня отлично! А у тебя?", parent);
        }
    }

    function createAnswer(text, parent) {
        var dv = document.createElement("div");
        var sp = document.createElement("span");
        


        sp.innerHTML = text;

        sp.classList.add("author-msg");
        dv.classList.add("msg");

        dv.appendChild(sp);
        parent.appendChild(dv);
    }
    
    const dvParent = document.getElementById("msgsid");

    const btn_push = document.getElementById("btnPush");
    

    const msg = document.getElementById('msg-text');

    btn_push.addEventListener('click', (event)=>{
                    
        
        var text = msg.value;
        if(text!=""){
            var dv = document.createElement("div");
            var sp = document.createElement("span");
            
            

            sp.classList.add("guest-msg");
            dv.classList.add("msg");

            

            sp.innerHTML = text;

            dv.appendChild(sp);
            dvParent.appendChild(dv);

            msg.value = "";

            checkMSG(text, dvParent);
        }
    });

    

    let Form = document.getElementById("myForm");

    let btn_open = document.getElementById("btnOpen");
    let btn_close = document.getElementById("btnClose");


    btn_open.addEventListener('click', (event)=>{
        Form.style.display = "block";

    });

    btn_close.addEventListener('click', (event)=>{
        
        Form.style.display = "none";
    });





                
                
                

}



