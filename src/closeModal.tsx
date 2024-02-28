/**
 * function to be called when you want to close payment
 */
 export default function closePaymentModal(): void {
  document.getElementsByName('checkout').forEach(item => {
    item.setAttribute('style',
    'position:fixed;top:0;left:0;z-index:-1;border:none;opacity:0;pointer-events:none;width:100%;height:100%;');
    item.setAttribute('id','flwpugpaidid');
    item.setAttribute('src','https://checkout.flutterwave.com/?');
  document.body.style.overflow = '';
  });
}
