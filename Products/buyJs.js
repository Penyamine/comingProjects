
document.addEventListener('DOMContentLoaded',function()
{

    var phoneNumber;
//    fetchPhoneNumber();
    alert('phone ');
    
    async function fetchPhoneNumber()
    {
        const response = await fetch('/Products/fetchAdminDetail.php'); 
        const data = await response.json(); 
        phoneNumber=data[0].phone_number;
    }
    


    function addEventListeners(){
    const buyToContactButton=document.querySelectorAll(".buy-to-contact-btn");
    if(buyToContactButton)
    {
   //    alert("btn found");
        buyToContactButton.forEach(function(button) 
        { 
     //      alert("buy"); 
             const newButton = button.cloneNode(true); button.parentNode.replaceChild(newButton, button);
            newButton.addEventListener('click', function(e) 
            { 
                alert('clicked');
                // const phoneNumber = '6385668175'; // Replace with the actual phone number 
                const message = 'hello'; // Replace with your pre-filled message 
                const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`; 
                //window.location.href = url; 
                window.open(url, '_blank');
            }
            ); 
        });
    }
    else
        alert("no but found"); 
    }
    addEventListeners();

    const productsDiv = document.querySelector('.products'); 
    const observer = new MutationObserver(function(mutations)
    { 
        mutations.forEach(function(mutation) 
        { 
            if (mutation.type === 'childList') 
                { // Re-add event listeners when new product cards are added 
                    addEventListeners(); 
                } 
            }); 
        }); 
        observer.observe(productsDiv, 
            { 
                childList: true, 
                subtree: true 
            });
    
});