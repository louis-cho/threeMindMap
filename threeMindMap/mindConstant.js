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
    }
}