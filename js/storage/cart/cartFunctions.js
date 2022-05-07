export function getCart(){
    const inCart = localStorage.getItem("inCart");

    if(!inCart){
        return [];
    } else {
        return JSON.parse(inCart);
    }
}