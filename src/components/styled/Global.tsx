import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  body{
    padding: 0;
    margin: 0;
    color: #fff;
    background-color: #262524;
  }

  .container{
    padding: 15px 100px;
  }

  .pointer{
    cursor: pointer;
  }
  .underline {
    text-decoration: underline;
  }

  .divider {
    border: 1px solid rgba(194, 181, 181, 0.3)
  }

  /* backgrounds */

  .bg_443E3A {
    background-color: #443E3A !important;
  }

  /* text colors */

  .white_text {
    color: #fff !important;
  }
  
  .btn_outlined{
    padding: 10px 15px;
    background: linear-gradient(38.44deg, #F47F57 15.81%, #FD5656 87.57%);
    color: #fff !important;
    outline: none;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
  }

  /* margins */

  .margin0auto {
    margin: 0 auto;
  }

  /* flex */

  .row_spaceBetween_center{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* customized material ui components */

  .selectFormcontrol{
    background-color:#151414 !important;
    width: 100% !important;
    padding: 10px !important;
    border-radius: 5px !important;
  }

  .insertManuallyFormcontrol {
    background-color: #151414 !important;; 
    border-radius: 5px !important;;
    width: 100% !important;;
  }

  @media only screen and (max-width: 768px){
    .container{
      padding: 15px;
   }
  }



`

export default GlobalStyles
