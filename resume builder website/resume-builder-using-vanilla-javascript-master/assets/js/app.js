// regex for validation
const strRegex =  /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const mainForm = document.getElementById('cv-form');
    if (mainForm) {
        // Attach the event listener to the form to call generateCV on any input change
        mainForm.addEventListener('input', generateCV);
        
        // Attach event listener to image input
        const imageInput = document.querySelector('.image');
        if (imageInput) {
            imageInput.addEventListener('change', previewImage);
        }
        
        // Initialize the preview
        generateCV();
    }
});

// generate CV
function generateCV(){
    try {
        // Basic Info
        let fName = document.querySelector('.firstname').value || '';
        let mName = document.querySelector('.middlename').value || '';
        let lName = document.querySelector('.lastname').value || '';
        document.getElementById('fullname_dsp').innerHTML = `${fName} ${mName} ${lName}`;
        document.getElementById('designation_dsp').innerHTML = document.querySelector('.designation').value || '';
        document.getElementById('address_dsp').innerHTML = document.querySelector('.address').value || '';
        document.getElementById('email_dsp').innerHTML = document.querySelector('.email').value || '';
        document.getElementById('phoneno_dsp').innerHTML = document.querySelector('.phoneno').value || '';
        document.getElementById('summary_dsp').innerHTML = document.querySelector('.summary').value || '';

        // Skills
        const skillsDsp = document.getElementById('skills_dsp');
        skillsDsp.innerHTML = "";
        document.querySelectorAll('.skill').forEach(skill => {
            if(skill.value){
                let li = document.createElement('li');
                li.textContent = skill.value;
                skillsDsp.appendChild(li);
            }
        });

        // Achievements
        const achievementsDsp = document.getElementById('achievements_dsp');
        achievementsDsp.innerHTML = "";
        document.querySelectorAll('.achieve_title').forEach((title, index) => {
            if(title.value) {
                let parentDiv = document.createElement('div');
                parentDiv.className = 'preview-item';
                let pTitle = document.createElement('h4');
                pTitle.textContent = title.value;
                let pDesc = document.createElement('p');
                pDesc.textContent = document.querySelectorAll('.achieve_description')[index].value || '';
                parentDiv.appendChild(pTitle);
                parentDiv.appendChild(pDesc);
                achievementsDsp.appendChild(parentDiv);
            }
        });

        // Experiences
        const experiencesDsp = document.getElementById('experiences_dsp');
        experiencesDsp.innerHTML = "";
        document.querySelectorAll('.exp_title').forEach((title, index) => {
            if(title.value) {
                let parentDiv = document.createElement('div');
                parentDiv.className = 'preview-item';
                
                let expHeader = document.createElement('h4');
                let organization = document.querySelectorAll('.exp_organization')[index].value || '';
                expHeader.textContent = `${title.value}${organization ? ', ' + organization : ''}`;
                
                let expDates = document.createElement('p');
                expDates.className = 'exp-dates';
                let startDate = document.querySelectorAll('.exp_start_date')[index].value || '';
                let endDate = document.querySelectorAll('.exp_end_date')[index].value || '';
                expDates.textContent = startDate && endDate ? `${startDate} - ${endDate}` : '';
                
                let expDesc = document.createElement('p');
                expDesc.textContent = document.querySelectorAll('.exp_description')[index].value || '';

                parentDiv.appendChild(expHeader);
                if (expDates.textContent) parentDiv.appendChild(expDates);
                if (expDesc.textContent) parentDiv.appendChild(expDesc);
                experiencesDsp.appendChild(parentDiv);
            }
        });

        // Education
        const educationsDsp = document.getElementById('educations_dsp');
        educationsDsp.innerHTML = "";
        document.querySelectorAll('.edu_school').forEach((school, index) => {
            if(school.value) {
                let parentDiv = document.createElement('div');
                parentDiv.className = 'preview-item';

                let eduHeader = document.createElement('h4');
                let degree = document.querySelectorAll('.edu_degree')[index].value || '';
                eduHeader.textContent = `${degree}${school.value ? ', ' + school.value : ''}`;

                let eduDates = document.createElement('p');
                eduDates.className = 'edu-dates';
                let startDate = document.querySelectorAll('.edu_start_date')[index].value || '';
                let endDate = document.querySelectorAll('.edu_graduation_date')[index].value || '';
                eduDates.textContent = startDate && endDate ? `${startDate} - ${endDate}` : '';
               
                let eduDesc = document.createElement('p');
                eduDesc.textContent = document.querySelectorAll('.edu_description')[index].value || '';

                parentDiv.appendChild(eduHeader);
                if (eduDates.textContent) parentDiv.appendChild(eduDates);
                if (eduDesc.textContent) parentDiv.appendChild(eduDesc);
                educationsDsp.appendChild(parentDiv);
            }
        });

        // Projects
        const projectsDsp = document.getElementById('projects_dsp');
        projectsDsp.innerHTML = "";
        document.querySelectorAll('.proj_title').forEach((title, index) => {
            if(title.value) {
                let parentDiv = document.createElement('div');
                parentDiv.className = 'preview-item';

                let projHeader = document.createElement('h4');
                let projLink = document.querySelectorAll('.proj_link')[index].value || '';
                if (projLink) {
                    projHeader.innerHTML = `${title.value} (<a href="${projLink}" target="_blank">Link</a>)`;
                } else {
                    projHeader.textContent = title.value;
                }

                let projDesc = document.createElement('p');
                projDesc.textContent = document.querySelectorAll('.proj_description')[index].value || '';

                parentDiv.appendChild(projHeader);
                if (projDesc.textContent) parentDiv.appendChild(projDesc);
                projectsDsp.appendChild(parentDiv);
            }
        });
    } catch (error) {
        console.error('Error in generateCV:', error);
    }
}


function validateFormData(elem, elemType, elemName){
    // checking for text string and non empty string
    if(elemType == validType.TEXT){
        if(!strRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for only text string
    if(elemType == validType.TEXT_EMP){
        if(!strRegex.test(elem.value)) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for email
    if(elemType == validType.EMAIL){
        if(!emailRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for phone number
    if(elemType == validType.PHONENO){
        if(!phoneRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for only empty
    if(elemType == validType.ANY){
        if(elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
}

// adding the invalid text
function addErrMsg(formElem, formElemName){
    formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
}

// removing the invalid text 
function removeErrMsg(formElem){
    formElem.nextElementSibling.innerHTML = "";
}

// image preview
function previewImage(){
    try {
        const imageInput = document.querySelector('.image');
        if (imageInput && imageInput.files && imageInput.files[0]) {
            let oFReader = new FileReader();
            oFReader.readAsDataURL(imageInput.files[0]);
            oFReader.onload = function(ofEvent){
                const imageDisplay = document.getElementById('image_dsp');
                if (imageDisplay) {
                    imageDisplay.src = ofEvent.target.result;
                }
            }
        }
    } catch (error) {
        console.error('Error in previewImage:', error);
    }
}

// print CV
function printCV(){
    // Make sure the preview is up to date before printing
    generateCV();
    
    // Small delay to ensure DOM updates are complete
    setTimeout(() => {
        window.print();
    }, 100);
}