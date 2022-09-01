async function addPillPopUp() {
  try {
    const { value: text } = await Swal.fire({
      title: "Prescribe Pill",
      html: `

        <style> 
        


        .modern-form {
          width: 90%;
          margin: 30px auto;
          background-color:  #fff;
          border: solid 1px #ccc;
          padding: 20px 10px;
          border-radius: 15px;
        }
        
        .modern-form h3 {
          text-align: center;
        }
        
        .float-label-field {
          border: none;
          outline: none;
          position: relative;
          margin: 0 0 20px 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .float-label-field input {
          border: none;
          outline: none;
          padding: 5px 5px 8px 0px;
          width: 100%;
          font-size: 18px;
          border-bottom: solid 1px #efefef;
        }
        
        .float-label-field label {
          opacity: 0.5;
          position: absolute;
          top: 10px;
          left: 0px;
          transition: all 0.2s ease;
          font-size: 18px;
        }
        
        .float-label-field.focus label {
          color: orange;
        }
        .float-label-field.focus input {
          border-bottom: solid 1px orange;
        }
        .float-label-field.float label {
          opacity: 1;
          top: -8px;
          font-size: 60%;
          transition: all 0.2s ease;
          font-weight: bold;
        }
        </style>

        <h1>hello</h1>

        <div class="modern-form">
          <fieldset class='float-label-field'>
            <label for="txtName">Name</label>
            <input id="txtName" type='text'>
          </fieldset>
          
          <fieldset class='float-label-field'>
            <input placeholder="Start Date" type="text" onfocus="(this.type='date')" id="date"> 
          </fieldset>
          
          <fieldset class='float-label-field'>
            <input placeholder="End Date" type="text" onfocus="(this.type='date')" id="date"> 
          </fieldset>
          
          <fieldset class='float-label-field'>
            <label for="txtConfirmPassword">Frequency</label>
            <input id="txtConfirmPassword" type='text'>
          </fieldset>

          
          <fieldset class='float-label-field'>
            <label for="txtConfirmPassword">Hour</label>
            <input id="txtConfirmPassword" type='number'>
          </fieldset>
        </div>
          <script src="../../js/popUpForm.js"></script>
      `,
      showCancelButton: true,
    });

    if (text) {
      Swal.fire(text);
    }
  } catch (error) {
    let errorMessage = error.message;
    alert(errorMessage);
  }
}
