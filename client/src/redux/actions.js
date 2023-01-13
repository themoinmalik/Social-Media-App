let actions = {
    refreshComponent:function(data){
        return {
            type:'REFRESH',
            payload:data
        }
    }
}

export default actions;