// const productList=[
//     {
//         "title":"wheet",
//         "img":"wheet.jpg",
//         "desc":"Hello It is good Product ieuher erjkfjdf hhjfdsadjkfa jshdfjdsf jhjagdsjf hsgddjskgag shgdsdjaskdf"
//     },
//     {
//         "title":"rice",
//         "img":"rice.jpg",
//         "desc":"Hello It is good Product hgjvd f gundfhg dfgdufgnkdh98reutre  reutnrejrffd  ifdhnvjhvnf v fduvdfinhvjfdk"        
//     }
// ]

document.addEventListener('DOMContentLoaded',function()
{
    pageOnload();

    function templateForProduct(product)
    {
    //    alert();
        const template=document.getElementById('product-template');
    //    alert(product['title']);
    
        const product_card=template.content.cloneNode(true);
    
        product_card.querySelector('.product-title').textContent=product['product_name'];
        product_card.querySelector('.product-image').src=`data:image/*;base64,${product.product_image}`;
        product_card.querySelector('.product-description').textContent=product['product_description'];
    
        return product_card;
    }
    async function pageOnload()
    {
    //    alert();
        try {
             const response = await fetch('/Products/selectProductPhp.php'); 
             const data = await response.json(); 
    console.log(data);
             data.forEach((product)=>
                {
            //        alert(product['title']);
                    document.querySelector('.product-list').appendChild(templateForProduct(product));
                });        
            }
             catch (error) {
                 console.error('Error fetching data:', error); 
            }
    }
    
        
});
