//create courses cards
let courses_container = document.querySelector('.courses-view')
function createCourseCard(item , index){
  let course = document.createElement('span');
  course.classList.add('course');
  let fig = document.createElement('figure');
  let img_div = document.createElement('div');
  img_div.classList.add('course-img');
  img= document.createElement('img');
  img.classList.add('course-photo');
  img.setAttribute('src', item.img);
  img_div.appendChild(img);
  fig.appendChild(img_div);
  course.appendChild(fig);
  let desc = document.createElement('h4');
  desc.classList.add('course-description');
  desc.textContent = item.description;
  course.appendChild(desc);
  let author = document.createElement('p');
  author.classList.add('author');
  author.textContent = item.author;
  course.appendChild(author);
  let stars_bar = document.createElement('div');
  stars_bar.classList.add('stars-bar');
  let stars_num = document.createElement('h5');
  stars_num.textContent=item.stars;
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
  let ratings_num = document.createElement('p');
  ratings_num.textContent=item.ratings_count;
  ratings_num.classList.add('ratings-num');
  stars_bar.appendChild(ratings_num);
  course.appendChild(stars_bar);
  let price = document.createElement('h4');
  price.textContent = 'E£'+item.price;
  course.appendChild(price);
  courses_container.appendChild(course);
}


const newFetch = async ()=>{
  let response=await fetch('http://localhost:3000/courses')
  let json= await response.json()
  console.log('json :>> ', json);
  return json
 }
 newFetch().then(x=>x.forEach(createCourseCard))
console.log('hello')


