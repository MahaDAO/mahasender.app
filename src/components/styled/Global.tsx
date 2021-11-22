import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  body{
    padding: 0;
    margin: 0;
    color: #fff;
    background-color: #151414;
    font-family: 'Inter', sans-serif;
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

  .bg_primary {
    background: linear-gradient(38.44deg, #F47F57 15.81%, #FD5656 87.57%) !important;
  }

  /* text colors */

  .white_text {
    color: #fff !important;
  }

  .orange_text{
    color:  #FF7F57 !important;
    font-family: 'Inter' !important;
    font-style: normal !important;
    font-weight: 500 !important;
    font-size: 14px !important;
    line-height: 20px !important;
  }

  .rgb256_064_text{
    color: rgba(255, 255, 255, 0.64) !important;
    font-family: 'Inter' !important;
    font-style: normal !important;
    font-weight: 500 !important;
    font-size: 14px !important;
    line-height: 20px !important;
  }

  .orange_bg{
    background-color:  #FF7F57 !important;
  }

  .rgb256_008_bg{
    background-color: rgba(255, 255, 255, 0.08) !important;
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

  .border_bottom1{
    border-bottom: 1px solid rgba(194, 181, 181, 0.3);
  }

  .border_right1{
    border-right: 1px solid rgba(194, 181, 181, 0.3);
  }

  .text_center{
    text-align: center;
  }

  /* margins */

  .margin0{
    margin: 0;
  }


  .margin0auto {
    margin: 0 auto !important;
  }

  .marginT24{
    margin-top: 24px;
  }

  .marginTB2{
    margin: 2px 0;
  }

  .marginB4{
    margin-bottom: 4px;
  }

  .marginB6{
    margin-bottom: 6px;
  }

  .marginB8{
    margin-bottom: 8px;
  }

  .marginB12{
    margin-bottom: 12px;
  }

  .marginB20{
    margin-bottom: 20px;
  }

  .marginB24{
    margin-bottom: 24px;
  }

  .marginB42{
    margin-bottom: 42px;
  }

  .marginB64{
    margin-bottom: 64px;
  }

  .marginB220{
    margin-bottom: 220px;
  }

  .marginR4{
    margin-right: 4px;
  }

  .marginR12{
    margin-right: 12px;
  }

  .marginR20{
    margin-right: 20px;
  }

  /* paddings */

  .padding20px {
    padding: 20px;
  }

  .line_spacing008em{
    letter-spacing: 0.08em;
  }

  .flex1Padding20{
    flex: 1;
    padding: 20px;
  }

  .flex1{
    flex: 1;
  }

  /* flex */

  .row_all_center{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .row_spaceBetween_center{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .flex_row {
    display: flex !important;
    flex-direction: row !important;
  }

  .flex_column{
    flex-direction: column;
  }

  .flex_row_center_start{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
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

  .editable{
    height: 200px;
    border: 1px solid black;
  }

  textarea{
    background-color: #151414;
    color: #fff;
    padding: 0;
    line-height: 157%;
    box-sizing: border-box;
    border: none;
    margin: 0;
    font-size: 14px;
    font-family: 'Inter';
    font-weight: 300;
    line-height: '140%';
    color: rgba(255, 255, 255, 0.64);
    width: 100%;
    resize: none;
  }

  textarea:focus{
    box-shadow: none !important;
    outline: none;
  }

  @media only screen and (max-width: 768px){
    .container{
      padding: 15px;
   }
  }

`

export default GlobalStyles

export const SummaryContentTitle = styled.div`
  font-weight: bold;
  font-size: 22px;
`

export const SummaryContentText = styled.div`
  font-weight: lighter;
  color: rgba(194, 181, 181, 0.8);
  font-size: 15px;
`

export const SummarySection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #151414;
  color: #fff;
  border-radius: 5px;
`
