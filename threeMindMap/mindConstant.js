import * as THREE from "../build/three.module.js";

export class mindConstant {

    constructor() {

        mindConstant.DefaultPref = {};

        // Renderer 추가 모드
        mindConstant.DefaultPref.Mode = [];

        mindConstant.DefaultPref.Mode["off"] = 0;
        mindConstant.DefaultPref.Mode["topic"] = 1;
        mindConstant.DefaultPref.Mode["subtopic"] = 2;

        mindConstant.DefaultPref.Topic = {};
        mindConstant.DefaultPref.Topic.Size = [200, 200];

        mindConstant.DefaultPref.Subtopic = {};
        mindConstant.DefaultPref.Subtopic.Size = [100, 30];

        mindConstant.DefaultPref.Color = [1, 1, 1];

        mindConstant.DefaultPref.Title = "No title";

        mindConstant.DefaultPref.Position = new THREE.Vector3(0,0,0);


        mindConstant.DefaultPref.TextColor = [0, 0, 0];


        // view mode
        mindConstant.ViewMode = {};
        mindConstant.ViewMode.WidgetView = 0;
        mindConstant.ViewMode.TreeView = 1;


        mindConstant.Message = {};
        mindConstant.Message.NoSubTopic = "No SubTopic Exist";

    }
}