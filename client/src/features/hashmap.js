let nameAsKey = new Map();
let nameAsImage = new Map();

export function Insert(key,imageUrl){
    nameAsKey[key.toLowerCase()]=key;
    nameAsImage[key.toLowerCase()]=imageUrl;
}

export function getValueName(key){
    return nameAsKey[key];
}

export function getValueUrl(key){
    return nameAsImage[key];
}