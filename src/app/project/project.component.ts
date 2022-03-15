import { Component, OnInit } from '@angular/core';
//import { KeyPairKeyObjectResult } from 'crypto';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects = [{
    name: "Airbnb UI Simulation",
    description: "This is a Front End React project using React, HTML, CSS. This UI simulates Airbnb main page UI.",
    image: '/assets/simuab.jpg',
    src: "https://determined-bardeen-601a3e.netlify.app/",
    sourcecode: "https://github.com/YuhongLiuCA/simusource"
  },{
    name: "Tour reference San Francisco Bay Area",
    description: "This is a full stack React project using React, HTML, CSS, Firebase. The application use firebase to store user information.",
    image: '/assets/travelsf.jpg',
    src: "https://travelsf.web.app/",
    sourcecode: "https://github.com/YuhongLiuCA/TravelsfSource"
  },{
    name: "Tic-tac-toe with AI algorithm",
    description: "The tic-tac-toe game with my own AI alogorithm using React JS, HTML, CSS, Netlify.",
    image: "/assets/react-tic-tac-toe.jpg",
    src: "https://heuristic-williams-a178f0.netlify.app",
    sourcecode: "https://github.com/YuhongLiuCA/tic-tac-toeSource"
  },{
    name: "YL Grocery",
    description: "Simple LWC together with APEX app on Salesforce.",
    image: "/assets/ylgrocery.jpg",
    src: "",
    sourcecode: "https://github.com/YuhongLiuCA/ylGrocery"
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
