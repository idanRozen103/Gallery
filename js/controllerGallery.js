// 'use strict';

$(window).ready(init)


function init() {
    renderProjects()
}

function renderProjects() {
    var projects = getProjects()
    var strHtml = projects.map(function (project) {
        return `
                <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" onclick="renderModal('${project.id}')" href="#portfolioModal1">
                <div class="portfolio-hover">
                    <div class="portfolio-hover-content">
                        <i class="fa fa-plus fa-3x"></i>
                    </div>
                </div>
                <img class="img-fluid" src=${project.imgUrl} alt="">
            </a>
         <div class="portfolio-caption">
            <h4>${project.name}</h4>
                <p class="text-muted">${project.labels}</p>
        </div>
        </div> `

    })
    $('#portfolio .row:nth-child(2)').html(strHtml.join(''))
}



function renderModal(id) {
    var currProj = gProjs.filter(function (proj) {
        return proj.id === id
    })

    var time = new Date(currProj[0].publishedAt) + '';
    $('.modal-body h2').text(currProj[0].name)
    $('.modal-body p:first-child').text(currProj[0].labels)
    $('.modal-body img').attr('src', currProj[0].imgUrl);
    $('.modal-body .description').text(currProj[0].desc)
    $('.modal-body a').attr('href', currProj[0].url);
    $('.modal-body ul li:nth-child(1)').text(`Date: ${time.substring(4, 15)} `)
}

function onSharePage() {
    $('ul a').attr('href', 'https://www.facebook.com/sharer.php?u=' + 'https://idanrozen103.github.io/minesweeper/');
    //chande line at the end
}


function onsendEmail() {

    var mailAddress = $('#contactMail').val();
    var mailSubject = $('#contactSubject').val();
    var mailMsg = $('#contactMsg').val();

    url = `https://mail.google.com/mail/?view=cm&fs=1&to=idanrozen103@gmail.com&su=${mailSubject}&body=${mailMsg} ${mailAddress}`;
    openCanvas();
    window.open(url, '_blank');

}