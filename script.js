const quizData = [

{
question:"What does HTML stand for?",
answers:[
"Hyper Text Markup Language",
"High Text Machine Language",
"Hyper Tool Markup Language",
"Home Text Markup Language"
],
correct:0
},

{
question:"What does CSS stand for?",
answers:[
"Creative Style Sheets",
"Cascading Style Sheets",
"Computer Style Sheets",
"Colorful Style Sheets"
],
correct:1
},

{
question:"Which language is used for web interactivity?",
answers:[
"Python",
"Java",
"JavaScript",
"C++"
],
correct:2
},

{
question:"Which HTML tag creates a hyperlink?",
answers:[
"<a>",
"<link>",
"<href>",
"<url>"
],
correct:0
},

{
question:"Which company developed React?",
answers:[
"Google",
"Microsoft",
"Facebook",
"Amazon"
],
correct:2
},

{
question:"Which CSS property changes text color?",
answers:[
"font-color",
"background",
"color",
"text-style"
],
correct:2
},

{
question:"Which HTML tag displays an image?",
answers:[
"<img>",
"<image>",
"<pic>",
"<src>"
],
correct:0
},

{
question:"Which symbol represents an ID selector in CSS?",
answers:[
".",
"#",
"*",
"&"
],
correct:1
},

{
question:"Which symbol represents a class selector in CSS?",
answers:[
"#",
".",
"@",
"$"
],
correct:1
},

{
question:"Which JavaScript function shows a popup message?",
answers:[
"alert()",
"popup()",
"message()",
"show()"
],
correct:0
},

{
question:"Which keyword declares a variable in JavaScript?",
answers:[
"int",
"var",
"float",
"string"
],
correct:1
},

{
question:"Which HTML version is the latest standard?",
answers:[
"HTML4",
"HTMLX",
"HTML5",
"HTML6"
],
correct:2
},

{
question:"Which CSS property adds space outside an element?",
answers:[
"padding",
"margin",
"border",
"width"
],
correct:1
},

{
question:"Which JavaScript method selects an element by ID?",
answers:[
"querySelectorAll()",
"getElementsByClassName()",
"getElementById()",
"getElementsByTagName()"
],
correct:2
},

{
question:"Which CSS feature helps create responsive websites?",
answers:[
"overflow",
"float",
"media queries",
"border-radius"
],
correct:2
}

];

let currentQuestionIndex = 0;
let score = 0;
let userName = "";

const welcomeScreen = document.getElementById("welcomeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

const feedback = document.getElementById("feedback");
const progressBar = document.getElementById("progress-bar");

document.getElementById("total-questions").innerText = quizData.length;

startBtn.addEventListener("click", startQuiz);

restartBtn.addEventListener("click", () => {
location.reload();
});

function startQuiz(){

userName = document.getElementById("username").value.trim();

if(userName===""){
alert("Please enter your name");
return;
}

welcomeScreen.style.display="none";
quizScreen.style.display="flex";

currentQuestionIndex=0;
score=0;

showQuestion();
}

function showQuestion(){

resetState();

let currentQuestion = quizData[currentQuestionIndex];

document.getElementById("current-question").innerText =
currentQuestionIndex + 1;

questionElement.innerText = currentQuestion.question;

let progress =
((currentQuestionIndex + 1) / quizData.length) * 100;

progressBar.style.width = progress + "%";

currentQuestion.answers.forEach((answer,index)=>{

const button=document.createElement("button");

button.innerText=answer;

button.classList.add("btn");

button.addEventListener("click",()=>selectAnswer(index));

answerButtons.appendChild(button);

});

}

function resetState(){

feedback.innerText="";
nextBtn.style.display="none";

while(answerButtons.firstChild){
answerButtons.removeChild(answerButtons.firstChild);
}

}

function selectAnswer(selectedIndex){

const correctIndex = quizData[currentQuestionIndex].correct;

const buttons = answerButtons.children;

for(let i=0;i<buttons.length;i++){

if(i===correctIndex){
buttons[i].classList.add("correct");
}

if(i===selectedIndex && selectedIndex!==correctIndex){
buttons[i].classList.add("wrong");
}

buttons[i].disabled=true;

}

if(selectedIndex===correctIndex){

score++;
feedback.innerText="✅ Correct Answer!";

}
else{

feedback.innerText="❌ Wrong Answer!";

}

setTimeout(()=>{

currentQuestionIndex++;

if(currentQuestionIndex<quizData.length){

showQuestion();

}
else{

showResult();

}

},1000);

}

function showResult(){

quizScreen.style.display="none";
resultScreen.style.display="flex";

let percentage=((score/quizData.length)*100).toFixed(2);

document.getElementById("resultName").innerText =
`Congratulations, ${userName}!`;

document.getElementById("finalScore").innerText =
`Score: ${score} / ${quizData.length}`;

document.getElementById("percentage").innerText =
`Percentage: ${percentage}%`;

let message="";

if(percentage>=90){

message="🌟 Outstanding! You have excellent Front-End Development knowledge.";

}
else if(percentage>=70){

message="🎉 Great Job! Your Front-End Development skills are strong.";

}
else if(percentage>=50){

message="👍 Good effort! Keep practicing HTML, CSS, JavaScript and React.";

}
else{

message="💪 You tried your best. Practice regularly and improve your Front-End skills.";

}

document.getElementById("performanceMessage").innerText = message;

}