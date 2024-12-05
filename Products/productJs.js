
document.addEventListener('DOMContentLoaded',function(){

const addButton=document.getElementById('add-button');
const updateButton=document.getElementById('update-button');
const showDetailsButton=document.getElementById('show-details-button');

const add_product_form=document.querySelector('.add-form');
const update_product_form=document.querySelector('.update-form');
const delete_product_form=document.querySelector('.delete-form');

const need_details_div_for_delete=document.querySelector('.need-details-div-for-delete');
const need_details_div=document.querySelector('.need-details-div')

function isDisplay(a)
{
    if(window.getComputedStyle(a).display!='none')
            return true;
    return false;
}

addButton.addEventListener('click',async(e)=>
{

    e.preventDefault();

    if(isDisplay(update_product_form))
    {
        update_product_form.style.display='none';
        
        if(isDisplay(need_details_div)){
            need_details_div.style.display='none';
            need_details_div.style.height='100%';
        }
    }
    if(isDisplay(delete_product_form))
    {
        delete_product_form.style.display='none';

        if(isDisplay(need_details_div_for_delete)){
            need_details_div_for_delete.style.display='none';
            need_details_div_for_delete.style.height='100%';
        }
    }
    
    const currentdisplay = window.getComputedStyle(add_product_form).display;
///    alert(currentdisplay)
    if (currentdisplay==='none') {
        add_product_form.style.display='flex';      
        document.documentElement.style.height="auto";
        document.body.style.height="100%";


    }
      
}
);

const addProductButton=document.getElementById('add-product-button');
addProductButton.addEventListener('click',async(e)=>
{
    const productId=document.getElementById('product-id-for-add').value;
    const productName=document.getElementById('product-name-for-add').value;
    const productDesc=document.getElementById('description-for-add').value;
    const imageFile=document.getElementById('image_for_add').files[0];
    const stockBtn=document.getElementById('stock-btn');
    alert(productId+" "+productName);
    if(imageFile)
    {
        if(!imageFile.type.startsWith('image/'))
        {
            alert("Only Image files are allowed!!!");
            return;
        }
    }

    const formData = new FormData();
    formData.append('product-id-for-add',productId);
    formData.append('product-name-for-add',productName);
    formData.append('product-desc-for-add',productDesc);
    formData.append('product-image-for-add',imageFile);

    try { 
    
        const response = await fetch('/Products/product.php'
            , { 
                method: 'POST',
                body:formData
            }
        ); 
//       console.log(response);
//        alert(response.status);
    const data = await response.json(); 
    if (data.success) { 
        alert(data.success); 
    } 
    else { 
        alert(data.error); 
    } 
} 
catch (error) { 
    console.error('Error updating product image:', error);
    alert('Failed to update product image. Please try again.'); 
}

});
updateButton.addEventListener('click',(e)=>
{
    // alert("Update Button");
    e.preventDefault();
    if(isDisplay(add_product_form))
        {
            add_product_form.style.display='none';
            document.documentElement.style.height="auto";
        }
        if(isDisplay(delete_product_form))
        {
            delete_product_form.style.display='none';
    
            if(isDisplay(need_details_div_for_delete)){
                need_details_div_for_delete.style.display='none';
                need_details_div_for_delete.style.height='100%';
            }
        }
        const currentdisplay = window.getComputedStyle(update_product_form).display;
//        alert(currentdisplay)
        if (currentdisplay==='none') {
            update_product_form.style.display='flex';      
            document.documentElement.style.height="auto";
    
        } 
    }
    );
showDetailsButton.addEventListener('click',async (e)=>{

    e.preventDefault();

    // alert('showing ');
    const product_id=document.getElementById("product-id-for-update").value;
    if(!product_id)
    {
        alert("Enter Product Id!!!");
        return;
    }

    const currentdisplay = window.getComputedStyle(need_details_div).display;
     
    if(currentdisplay==='none')
    {
        try {
            
         const response = await fetch(`/Products/fetchProduct.php?product_id=${product_id}`);
 
         
            const data =await response.json();
            // if(!response.ok)
            //     {
            //         alert(response.status);
            //         return;
            //     }    
            
    //       console.log(data);
                    if (data.error) {
                        alert(data.error);
                        return;
                    }


                   need_details_div.style.display='flex';
                    // document.documentElement.style.height="auto";
                    // alert(data.product_name);
                    document.getElementById('product-name-for-update').value = data.product_name ;
                    document.getElementById('description-for-update').value = data.product_description ;

                    if(data.product_image) {
                        // alert(data.product_image);
                        const img_preview=document.getElementById('preview-for-update');
                        img_preview.style.display='block';
                    document.getElementById('preview-for-update').src = `data:image/*;base64,${data.product_image}`;
                    }


        }
        catch{
            console.error('Error fetching product details:', error);
                    alert('Failed to fetch product details. Please try again.');
        }
        
    }
}
);   

const updateProductNameButton=document.getElementById('update-product-name-btn');
updateProductNameButton.addEventListener('click',(e)=>
{
    e.preventDefault();
    const product_name=document.getElementById('product-name-for-update').value;
    const given_product_name=document.getElementById('need-product-name-for-update').value;
    //alert(updated_product_name+" "+given_product_name);
    if(!given_product_name){
        alert("Please Give Product Name to Update!!");
        return;
    }
    else if(given_product_name===product_name)
    {
        alert("You  have given same Product Name ... So,No Need to Update ....");
        return;
    }
    else
    {
        const productId=document.getElementById('product-id-for-update').value;
        // alert(productId+" "+given_product_name);
        updateProductName(productId,given_product_name);
    }        
});
async function updateProductName(product_id, product_name) { 
    try { 
        const response = await fetch('/Products/update_product.php', 
            { 
                method: 'POST', 
                body: JSON.stringify({ 
                    product_id: product_id,
                    product_name: product_name 
                }) 
            });
            // alert(response.status);
        // if(!response.ok)
        //     alert(response.status);
        const data = await response.json(); 
        // alert(data);
        if (data.success) 
        { 
            alert(data.success); 
        }
        else { 
            console.error('Error:', data.error); 
            alert(data.error); 
        } 
    } 
    catch (error) { 
        console.error('Error updating product name:', error); 
        alert('Failed to update product name. Please try again.'); 
    } 
} 


const updateProductDescButton=document.getElementById('update-product-desc-btn');
updateProductDescButton.addEventListener('click',(e)=>
{
    e.preventDefault();
    const product_desc=document.getElementById('description-for-update').value;
    const given_product_desc=document.getElementById('need-description-for-update').value;
    //alert(updated_product_name+" "+given_product_name);
    if(!given_product_desc){
        alert("Please Give Product Desc to Update!!")
        return;
    }
    else if(given_product_desc===product_desc)
    {
        alert("You  have given same Product Desc ... So,No Need to Update ....");
        return;
    }
    else
    {
        const productId=document.getElementById('product-id-for-update').value;
       updateProductDesc(productId,given_product_desc);

    }        

});

async function updateProductDesc(product_id, product_description) { 
    try { 
        const response = await fetch('/Products/update_product.php', 
            { 
                method: 'POST', 
                body: JSON.stringify({ 
                    product_id: product_id,
                    product_description: product_description 
                }) 
            });
        if(!response.ok)
            alert(response.status);
        const data = await response.json(); 
        if (data.success) 
        { 
            alert(data.success); 
        }
        else { 
            console.error('Error:', data.error); 
            alert(data.error); 
        } 
    } 
    catch (error) { 
        console.error('Error updating product Desc:', error); 
        alert('Failed to update product desc. Please try again.'); 
    } 
} 

const updateProductImageButton=document.getElementById('update-product-image-btn');
updateProductImageButton.addEventListener('click',async()=>
    {
        const productId=document.getElementById('product-id-for-update').value;
        const imageFile=document.getElementById('image-for-update').files[0];

        if(imageFile)
        {
            if(!imageFile.type.startsWith('image/'))
            {
                alert("Only Image files are allowed!!!");
                return;
            }
        }
        const formData = new FormData();
        formData.append('product-id-for-update', productId); 
        formData.append('image-for-update', imageFile);
        try { 
        
            const response = await fetch('/Products/changeProductImage.php'
                , { 
                    method: 'POST',
                    body:formData
                }
            ); 
 //       console.log(response);
//        alert(response.status);
        const data = await response.json(); 
        if (data.success) { 
            alert(data.success); 
        } 
        else { 
            alert(data.error); 
        } 
    } 
    catch (error) { 
        console.error('Error updating product image:', error);
        alert('Failed to update product image. Please try again.'); 
    }
        
    }
);

// updateProductImageButton.addEventListener('click',async(e)=>
// {
//     e.preventDefault();
//     const productId=document.getElementById('product-id-for-update').value;
//     const imageFile=document.getElementById('image-for-update').files[0];
//     // const given_product_desc=document.getElementById('need-description-for-update').value;
//     //alert(updated_product_name+" "+given_product_name);
//     alert("Image go to upload");

//     const formData = new FormData(); 
//     formData.append('product_id', productId); 
//     formData.append('image', imageFile); 
//     // alert(productId);
// //    alert(json.stringify(formData));
// //alert(formData);
//     try { 
//         for (let pair of formData.entries()) {
//             console.log(pair[0] + ', ' + pair[1]);
//         }
//         const response = await fetch('/Products/update_product.php'
//             , { 
//                 method: 'POST',
//                 body:formData
//             }
//         ); 
//         console.log(response);
//         alert(response.status);
//         const data = await response.json(); 
//         if (data.success) { 
//             alert(data.success); 
//         } 
//         else { 
//             alert(data.error); 
//         } 
//     } 
//     catch (error) { 
//         console.error('Error updating product image:', error);
//         alert('Failed to update product image. Please try again.'); 
//     }
// });


// async function updateProductImage(product_id, product_image) { 
//     try { 
//         const response = await fetch('/Products/update_product.php', 
//             { 
//                 method: 'POST', 
//                 body: JSON.stringify({ 
//                     product_id: product_id,
//                     product_image:product_image 
//                 }) 
//             });
//         if(!response.ok)
//             alert(response.status);
//         const data = await response.json(); 
//         if (data.success) 
//         { 
//             alert(data.success); 
//         }
//         else { 
//             console.error('Error:', data.error); 
//             alert(data.error); 
//         } 
//     } 
//     catch (error) { 
//         console.error('Error updating product Image:', error); 
//         alert('Failed to update product Image. Please try again.'); 
//     } 
// } 

const deleteButton=document.getElementById("delete-button");


deleteButton.addEventListener('click',()=>
    {
        if(isDisplay(update_product_form))
            {
                update_product_form.style.display='none';
                
                if(isDisplay(need_details_div)){
                    need_details_div.style.display='none';
                    need_details_div.style.height='100%';
                }
            }
            if(isDisplay(add_product_form))
            {
                add_product_form.style.display='none';        
            }
            const currentdisplay = window.getComputedStyle(delete_product_form).display;
            // alert(currentdisplay)
            if (currentdisplay==='none') {
                delete_product_form.style.display='flex';      
                document.documentElement.style.height="auto";
        
            }          
        }
        );

const showDetailsButtonForDelete=document.getElementById('show-details-button-for-delete');
    showDetailsButtonForDelete.addEventListener('click',async (e)=>{

        
        const product_id=document.getElementById("product-id-for-delete").value;
        if(!product_id)
        {
            alert("Enter Product Id!!!");
            return;
        }
    
        e.preventDefault();
//        alert();
        const currentdisplay = window.getComputedStyle(need_details_div_for_delete).display;
         
        if(currentdisplay==='none')
        {
            
           try {
            
            const response = await fetch(`/Products/fetchProduct.php?product_id=${product_id}`);

            const data =await response.json();
            
            console.log(data);
            // if(!response.ok ){
            //     alert(response.status);
            //     return;
            // }
            if (data.error) {
                    alert(data.error);
                    return;
            }

            
        document.getElementById('product-name-for-delete').value = data.product_name ;
        document.getElementById('description-for-delete').value = data.product_description ;
        if(data.product_image) {
            const img_preview=document.getElementById('preview-for-delete');
            img_preview.style.display='block';
            const i=document.getElementById('preview-for-delete').src = `data:image/*;base64,${data.product_image}`;
        }
            need_details_div_for_delete.style.display='flex';
            document.documentElement.style.height="auto";     
        }
        catch{
            console.error('Error fetching product details:', error);
                    alert('Failed to fetch product details. Please try again.');
        }
        }
    }
    ); 
    
const deleteProductButton=document.getElementById('delete-product-btn');

if(deleteProductButton){
deleteProductButton.addEventListener('click',async(e)=>
{
    e.preventDefault();
    try{

        const product_id=document.getElementById("product-id-for-delete").value;
        if(!product_id)
        {
            alert("Enter Product Id!!!");
            return;
        }
        const response = await fetch(`/Products/delete_Product.php?product_id=${product_id}`);

        const data =await response.json();

        if(data.success)
            alert("Deleted Successfully");
        
    }
    catch{
        
    }
});
}
else
    console.error("No delete Btn");
});


/*

            const updateProductButton=document.getElementById('update-product-btn');
            updateProductButton.addEventListener('click',(e)=>
            {
                e.preventDefault();
                const updated_product_name=document.getElementById('product-name-for-update').value;
                const updated_product_desc=document.getElementById('description-for-update').value;
                const updated_image=document.getElementById('preview-for-update').value;

                alert(data.product_name+" "+updated_product_name);
                if(updated_product_name!==data.product_name)
                {
                    alert('going to update name');
                    updateProductName(product_id,updated_product_name);
                }
                if(updated_product_desc!==data.product_description)
                {
                    alert('going to update desc');
                    updateProductDesc(product_id,updated_product_desc);
                }
                if(updated_product_desc!==data.product_image)
                {
                    alert('going to update image');
                    updateProductImage(product_id,updated_image);
                }
            });
            

*/