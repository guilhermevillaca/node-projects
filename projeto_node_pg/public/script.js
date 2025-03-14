function buscarPessoa(){

    var url = '/pessoa';

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        }).catch((error) => {
            console.error(error);
        });

}