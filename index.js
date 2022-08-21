//fill courses container

 //make the fuction asyncronous
let fillCoursesContainer = async (topic)=> {
  //fetching the data from the server
  let topicData=await fetch('http://localhost:3000/'+topic);
  let topicJsonData= await topicData.json()

  //get courses container
  let courses_container = document.querySelector('.courses-container');

  //create the description header
  let courses_H = document.createElement('h1');
  courses_H.classList.add('courses-H');
  courses_H.textContent = topicJsonData.head;
  courses_container.appendChild(courses_H);
  

  //create the description paragraph
  let courses_b_box = document.createElement('div');
  courses_b_box.classList.add('courses-b-box');
  let courses_p = document.createElement('p');
  courses_p.classList.add('courses-p');
  courses_p.textContent = topicJsonData.paragraph;
  courses_b_box.appendChild(courses_p);
  courses_container.appendChild(courses_b_box);

  //create the explore button
  let explore_button = document.createElement('button');
  explore_button.classList.add('courses-explore-button');
  explore_button.textContent = 'Explore '+topicJsonData.topicname;
  courses_container.appendChild(explore_button);

  

  //filling the carousel view div with courses cards
  let carousel_view_div = document.createElement('div');
  carousel_view_div.classList.add('carousel');
  carousel_view_div.classList.add('slide');
  carousel_view_div.classList.add('carousel-dark');
  carousel_view_div.setAttribute('data-bs-ride','carousel');
  carousel_view_div.setAttribute('id','carouselSlidesControls');

  let carousel_inner = document.createElement('div');
  carousel_inner.classList.add('carousel-inner');
  let courses_in_screen = Math.floor(window.innerWidth/360);
  let added = 0;  let carousel_item;
  for (let i = 0; i < topicJsonData.courses.length; i++) {
    //creating new carousel item (new slide)
    if (added == 0){
      carousel_item = document.createElement('div');
      carousel_item.classList.add('carousel-item');
      if (i==0)carousel_item.classList.add('active');
      carousel_inner.appendChild(carousel_item);
    }

    //creating new course card
    let item = topicJsonData.courses[i];
    let course = document.createElement('div');
    course.classList.add('course');

    //adding course image to the course card
    let fig = document.createElement('figure');
    let img_div = document.createElement('div');
    img_div.classList.add('course-img');
    img= document.createElement('img');
    img.classList.add('course-photo');
    img.setAttribute('src', item.img);
    img.setAttribute('alt', topic+" course: "+toString(i+1));
    img_div.appendChild(img);
    fig.appendChild(img_div);
    course.appendChild(fig);

    //adding course title to the course card
    let desc = document.createElement('h4');
    desc.classList.add('course-description');
    desc.textContent = item.description;
    course.appendChild(desc);

    //adding course author to the course card
    let author = document.createElement('p');
    author.classList.add('author');
    author.textContent = item.author;
    course.appendChild(author);

    //adding course stars bar to the course card
    let stars_bar = document.createElement('div');
    stars_bar.classList.add('stars-bar');
    let stars_num = document.createElement('h5');
    stars_num.textContent=item.stars;
    stars_num.classList.add('stars-num');
    stars_bar.appendChild(stars_num);
    for(let i=0; i<item.stars; i++){
      let star = document.createElement('span');
      star.classList.add('fa');
      star.classList.add('fa-star');
      star.classList.add('checked');
      stars_bar.appendChild(star);
    }
    for(let i=item.stars; i<5; i++){
      let star = document.createElement('span');
      star.classList.add('fa');
      star.classList.add('fa-star');
      stars_bar.appendChild(star);
    }

    //adding ratings count to stars bar
    let ratings_num = document.createElement('p');
    ratings_num.textContent=' ('+item.ratings_count+') ';
    ratings_num.classList.add('ratings-num');
    stars_bar.appendChild(ratings_num);
    course.appendChild(stars_bar);

    //adding course price to the course card
    let price = document.createElement('h4'); 
    price.classList.add('price-text');
    price.textContent = 'E£'+item.price;
    course.appendChild(price);
    carousel_item.appendChild(course);
    added = (added+1)%courses_in_screen;
  }
  carousel_view_div.appendChild(carousel_inner);

  //adding carousel controls to the carousel view div
  carousel_view_div.innerHTML += `
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselSlidesControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
</button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselSlidesControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
</button>
`;
  courses_container.appendChild(carousel_view_div);
}





 


let search_form = document.querySelector('.search-form');
search_form.addEventListener('submit', (e)=>{
  e.preventDefault();
  let search_input = document.querySelector('.search-area');
  let search_value = search_input.value;
  let courses = document.querySelectorAll('.course');
  courses.forEach(course=>{
    if(course.querySelector('.course-description').textContent.includes(search_value)){
      course.style.display = 'inline-block';
    }
    else{
      course.style.display = 'none';
    }
    
  })});





function viewCourses(event , topic){
  event.preventDefault();

  //disable the current active button
  let buttons = document.querySelectorAll('.last-bar-button');
  buttons.forEach(button=>{
    button.classList.remove('active');
  });

  //remove previous topic data
  let course_descriptipn_headed = document.querySelector('.courses-H');
  if(course_descriptipn_headed)course_descriptipn_headed.remove();
  let course_descriptipn_paragraph = document.querySelector('.courses-b-box');
  if(course_descriptipn_paragraph)course_descriptipn_paragraph.remove();
  let explore_button = document.querySelector('.courses-explore-button');
  if(explore_button)explore_button.remove();
  let courses_view = document.querySelector('.carousel');
  if(courses_view)courses_view.remove();

  //make the clicked button active
  event.currentTarget.classList.add('active');

  //fill the courses container with the new topic data
  fillCoursesContainer(topic);
}

//make the python explore button active at first
document.getElementById("defaultTabButton").click();
