const json = `{"quiz": {"sport": {"q1": {"question": "Which one is correct team name in NBA?","options": ["New York Bulls","Los Angeles Kings","Golden State Warriros","Huston Rocket"],"answer": "Huston Rocket"}},"maths": {"q1": {"question": "5 + 7 = ?","options": ["10","11","12","13"], "answer": "12"},"q2": {"question": "12 - 8 = ?","options": ["1","2","3", "4"],"answer": "4" }}}}`

const arrayNode = (currentNode,name) => {
    if(currentNode.children == null){
        currentNode.children = [];
    }
    currentNode.children[`${name}`] = {
        type:'array', 
        parent: currentNode, 
        children: [], 
        name
    }
    return currentNode.children[`${name}`];
}
const objNode = (currentNode, name) => {
    if(currentNode.children == null){
        currentNode.children = {};
    }
    currentNode.children[`${name}`] = {
        type:'object', 
        parent: currentNode, 
        children: {}, 
        name
    }
    return currentNode.children[`${name}`];
}
const valueNode = (currentNode, name, value) => {
    currentNode.children[`${name}`] = {
        type:'value', 
        parent: currentNode,  
        name,
        value
    }
    return currentNode.children;
}

const jsonParser = json => {
    const stacks = [];
    const root = {type:'root', parent: null, children: null, name:"root", value:''};
    let currentNode = root;
    let name = '';
    let value = '';
    let cursor = 0;
    while(cursor < json.length){
        if(json[cursor] == `"`){
            cursor++;
            name = json.substring(cursor, cursor = json.indexOf('"', cursor + 1));

            if(cursor == -1){
                break;
            }
            cursor++;
            if(json[cursor] == `:`){
                cursor++;
            }
            while(json[cursor] == ` `){
                cursor++;
            }

            if(json[cursor] == `]`){
                valueNode(currentNode, name, name);
                continue;
            }
            if(json[cursor] == `,`){
                valueNode(currentNode, name, name);
            } else if(json[cursor] == `{`){
                const _currentNode = objNode(currentNode, name);
                currentNode = _currentNode;
            } else if(json[cursor] == `"`){
                cursor++;
                value = json.substring(cursor, cursor = json.indexOf('"', cursor + 1));
                valueNode(currentNode, name, value);
            } else if(json[cursor] == `[`){
                const _currentNode = arrayNode(currentNode, name, value);
                currentNode = _currentNode;
            }
        } else if(json[cursor] == `]`){
            currentNode = currentNode.parent;
        } else if(json[cursor] == `}`){
            currentNode = currentNode.parent;
        }

        cursor++;
    }
    return root;
}
console.log(jsonParser(json));