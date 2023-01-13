
//implementing search bar-----------------------------------------------------------------------
function TrieNode(key){
    this.key=key;
    this.parent=null;
    this.children={};
    this.end=false;

}

TrieNode.prototype.getword=function(){
   var output=[];
   var node=this;

   while(node!==null){
       output.unshift(node.key);
       node=node.parent;
   }
   return output.join('');
};
function Trie(){
   this.root=new TrieNode(null);
}

Trie.prototype.insert=function(word){//trie fucntion ka prototype hai
   var node=this.root;

   for(var i=0;i<word.length;i++){
       if(!node.children[word[i]]){
           node.children[word[i]]=new TrieNode(word[i]);
           node.children[word[i]].parent=node;
       }
       node=node.children[word[i]];

       if(i==word.length-1){
           node.end=true;
       }
   }
};  

Trie.prototype.find=function(prefix){
  var node=this.root;
  var output=[];

  for(var i=0;i<prefix.length;i++){
      if(node.children[prefix[i]]){
          node=node.children[prefix[i]];
      }
      else{
          return output;
      }
  }
  findAllWords(node,output);

  return output;
};

function findAllWords(node,arr){
   if(node.end){
       arr.unshift(node.getword());

   }
   for(var child in node.children){
       findAllWords(node.children[child],arr);
   }
}
let Triee=new Trie();
export default Triee;