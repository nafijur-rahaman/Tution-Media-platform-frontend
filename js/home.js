
const navElement = document.getElementById("navbar");
const token = localStorage.getItem("teacher_token");
const token2 = localStorage.getItem("student_token");

if (token) {
    navElement.innerHTML += `
    <div class="header_container">
          <div class="container">
            <div class="row">
              <div class="col">
                <div
                  class="header_content d-flex flex-row align-items-center justify-content-start"
                >
                  <div class="logo_container">
                    <a href="index.html">
                      <div class="logo_text">Tuition <span>Platform</span></div>
                    </a>
                  </div>
                  <nav class="main_nav_contaner ml-auto">
                    <ul class="main_nav">
                      <li class="active"><a href="#">Home</a></li>
                      <li><a href="tuitions.html">Tuitions</a></li>
                      <li><a href="teachers.html">Teachers</a></li>
                      <li><a href="about.html">About</a></li>
                      <li><a href="contact.html">Contact</a></li>
                  <button
              type="button"
              class="register_button menu_mm"
              onclick="location.href='teacher_profile.html';"
            >
            Profile
            </button>
            <button
              type="button"
              class="login_button menu_mm"
              onclick="TutorHandleLogout()"
            >
              Logout
            </button>
                    </ul>

                    <!-- Hamburger -->

                    <div class="hamburger menu_mm">
                      <i class="fa fa-bars menu_mm" aria-hidden="true"></i>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
     

 

      <div
        class="menu d-flex flex-column align-items-end justify-content-start text-right menu_mm trans_400"
      >
        <div class="menu_close_container">
          <div class="menu_close">
            <div></div>
            <div></div>
          </div>
        </div>

        <div class="menu_nav">
          <ul class="menu_mm">
            <li class="menu_mm"><a href="index.html">Home</a></li>
            <li class="menu_mm"><a href="tuitions.html">Tuitions</a></li>
            <li class="menu_mm"><a href="teachers.html">Teachers</a></li>
            <li class="menu_mm"><a href="about.html">About</a></li>
            <li class="menu_mm"><a href="contact.html">Contact</a></li>
            <button
              type="button"
              class="m_register_button menu_mm"
              onclick="location.href='teacher_profile.html';"
            >
            Profile
            </button>
            <button
              type="button"
              class="m_login_button menu_mm"
              onclick="TutorHandleLogout()"
            >
              Logout
            </button>
          </ul>
        </div>
      </div>

    `;
} else if (token2) {
    navElement.innerHTML += `
    <div class="header_container">
          <div class="container">
            <div class="row">
              <div class="col">
                <div
                  class="header_content d-flex flex-row align-items-center justify-content-start"
                >
                  <div class="logo_container">
                    <a href="index.html">
                      <div class="logo_text">Tuition <span>Platform</span></div>
                    </a>
                  </div>
                  <nav class="main_nav_contaner ml-auto">
                    <ul class="main_nav">
                      <li class="active"><a href="#">Home</a></li>
                      <li><a href="tuitions.html">Tuitions</a></li>
                      <li><a href="teachers.html">Teachers</a></li>
                      <li><a href="about.html">About</a></li>
                      <li><a href="contact.html">Contact</a></li>
                       <button
              type="button"
              class="register_button menu_mm"
              onclick="location.href='student_profile.html';"
            >
            Profile
            </button>
            <button
              type="button"
              class="login_button menu_mm"
              onclick="StudentHandleLogout()"
            >
              Logout
            </button>
                    </ul>

                    <!-- Hamburger -->

                    <div class="hamburger menu_mm">
                      <i class="fa fa-bars menu_mm" aria-hidden="true"></i>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
     

 

      <div
        class="menu d-flex flex-column align-items-end justify-content-start text-right menu_mm trans_400"
      >
        <div class="menu_close_container">
          <div class="menu_close">
            <div></div>
            <div></div>
          </div>
        </div>

        <div class="menu_nav">
          <ul class="menu_mm">
            <li class="menu_mm"><a href="index.html">Home</a></li>
            <li class="menu_mm"><a href="tuitions.html">Tuitions</a></li>
            <li class="menu_mm"><a href="teachers.html">Teachers</a></li>
            <li class="menu_mm"><a href="about.html">About</a></li>
            <li class="menu_mm"><a href="contact.html">Contact</a></li>
            <button
              type="button"
              class="m_register_button menu_mm"
              onclick="location.href='student_profile.html';"
            >
            Profile
            </button>
            <button
              type="button"
              class="m_login_button menu_mm"
              onclick="StudentHandleLogout()"
            >
              Logout
            </button>
          </ul>
        </div>
      </div>


    `;
} else {
    navElement.innerHTML += `


   <div class="header_container">
          <div class="container">
            <div class="row">
              <div class="col">
                <div
                  class="header_content d-flex flex-row align-items-center justify-content-start"
                >
                  <div class="logo_container">
                    <a href="index.html">
                      <div class="logo_text">Tuition <span>Platform</span></div>
                    </a>
                  </div>
                  <nav class="main_nav_contaner ml-auto">
                    <ul class="main_nav">
                      <li class="active"><a href="#">Home</a></li>
                      <li><a href="tuitions.html">Tuitions</a></li>
                      <li><a href="teachers.html">Teachers</a></li>
                      <li><a href="about.html">About</a></li>
                      <li><a href="contact.html">Contact</a></li>
                      <button
                        type="button"
                        class="register_button"
                        onclick="location.href='register.html';"
                      >
                        Register
                      </button>
                      <button
                        type="button"
                        class="login_button"
                        onclick="location.href='login.html';"
                      >
                        Login
                      </button>
                    </ul>

                    <!-- Hamburger -->

                    <div class="hamburger menu_mm">
                      <i class="fa fa-bars menu_mm" aria-hidden="true"></i>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
     

 

      <div
        class="menu d-flex flex-column align-items-end justify-content-start text-right menu_mm trans_400"
      >
        <div class="menu_close_container">
          <div class="menu_close">
            <div></div>
            <div></div>
          </div>
        </div>

        <div class="menu_nav">
          <ul class="menu_mm">
            <li class="menu_mm"><a href="index.html">Home</a></li>
            <li class="menu_mm"><a href="tuitions.html">Tuitions</a></li>
            <li class="menu_mm"><a href="teachers.html">Teachers</a></li>
            <li class="menu_mm"><a href="about.html">About</a></li>
            <li class="menu_mm"><a href="contact.html">Contact</a></li>
            <button
              type="button"
              class="m_register_button menu_mm"
              onclick="location.href='register.html';"
            >
              Register
            </button>
            <button
              type="button"
              class="m_login_button menu_mm"
              onclick="location.href='login.html';"
            >
              Login
            </button>
          </ul>
        </div>
      </div>



    `;
}

