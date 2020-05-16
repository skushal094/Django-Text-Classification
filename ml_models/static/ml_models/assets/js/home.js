
$(() => {

    window.hash_disabled = false;

    function focusSearchBox(delayMs = 0, flashEffect = false) {
        if(delayMs && $('.si').is(":focus")) {
            $('.si').blur();
        }
        return setTimeout(() => {            
            if(!$('.si').is(":focus")) {
                if(distFromTop(".si-wrapper") > 0) {
                    $('.si').focus();
                    $('.si-wrapper').addClass('focus');
                    if(flashEffect && !$('.si-wrapper').hasClass('flash')) {
                        $('.si-wrapper').addClass('flash');
                        setTimeout(() => {
                            $('.si-wrapper').removeClass('flash');
                        }, 5000);
                    }
                }
            } 
        }, delayMs);
    }
    function getBlogPosts() {
        const numPosts = 3;
        const recentPostsUri = `/blog/api/posts?_embed&per_page=${numPosts}&orderby=date&order=desc`;
        $.getJSON(recentPostsUri)
            .done(data => {
                $.each(data, (i, item) => {
                    var imgUrl = item.jetpack_featured_media_url;
                    var title = item.title.rendered;
                    var date = `<i class="fe fe-clock text-dark"></i>${dateFormatted(item.date)}`;
                    var author = item._embedded.author[0].name;
                    var authorImgUrl = Object.values(item._embedded.author[0].avatar_urls).pop();
                    var url = item.link.replace('blog.quetext.com', 'www.quetext.com/blog');

                    // ensure author's first name only
                    if (author.indexOf(' ') !== -1) {
                        author = author.split(' ')[0];
                    }

                    const postContainer = $(`#blog-post-${i+1}`);
                    postContainer.find('.blog-post-img').prop('src', imgUrl);
                    postContainer.find('.blog-post-author-img').prop('src', authorImgUrl);
                    postContainer.find('.blog-post-author').text(author);
                    postContainer.find('.blog-post-date').html(date);
                    postContainer.find('.blog-post-title').html(title);
                    postContainer.find('.blog-post-url').prop('href', url);
                });
            })
            .fail(err => {
                console.log(err);
            });
    }
    function inputChange() {
        
        var text = $('.si').val().trim();
        console.log(text.length);
        if (text.length > 0) {
            $('#submit-new-text').removeClass('disabled');
            $('.si-overlay').addClass('invisible');
        } else {
            $('#submit-new-text').addClass('disabled');
            $('.si-overlay').removeClass('invisible');
        }
    }
    function initSearchForm() {

        $('.si').val('');
        $('.si').on('keyup focus blur paste', event => {
            inputChange();
        });
        $('.si').bind('paste', event => {
            setTimeout(() => { inputChange(); }, 200);
        });

        // on submit
        $('#submit-new-text').on('click', event => {
            const $this = $(event.currentTarget);
            if ($this.hasClass('disabled')) {
                return false;
            }
            const defaultBtnText = $this.find('.default-text');
            const loadingBtnText = $this.find('.loading-text');
            const inputText = $('.si').val();

            defaultBtnText.hide();
            loadingBtnText.show();
            $('#submit-new-text').addClass('disabled');

            $.post('/api/check', {
                inputType: 'single_text',
                deepsearch: false,
                input: {
                    text: inputText,
                    title: null
                }
            })
            .done(data => {    
                if (data.error) {
                    if ([130, 150, 180, 5005].indexOf(data.error) !== -1) {
                        // user has exhausted free guest searchs - must create account
                        $("#modalSignup").modal({ show: true, keyboard: false });
                    } 
                    else if(data.error === 90095) {
                        alert(data.message);
                    }
                    else {
                        alert('Please enter at least 20 words');
                    }
                    // revert submit button to initial state
                    defaultBtnText.show();
                    loadingBtnText.hide();
                } 
                else {
                    setTimeout(() => {
                        document.location = '/results/' + data.id;
                    }, 1000);
                }
            })
            .fail((data, status) => {
                console.log('error, please try again in a minute');
                console.log(data || status);
                window.location.reload();
            })
        });
    }

    $('.si-wrapper textarea')
        .on('focus', () => {
            $('.si-wrapper')
                .addClass('focus');
        })
        .on('blur', () => {
            $('.si-wrapper')
                .removeClass('focus');
        });

    $('.modal')
        .on('shown.bs.modal', ev => {
            // freeze body behind modal
            $('body').addClass('frozen');
            // autofocus first input box
            $(ev.currentTarget).find('#signupEmail').trigger('focus');
        })
        .on('hidden.bs.modal', ev => {
            // freeze body behind modal
            $('body').removeClass('frozen');
        });

    $(window)
        .on('hashchange', ev => {
            const hash = window.location.hash || '';
            if(window.hash_disabled === true) {
                return false;
            }
            window.hash_disabled = true;
            if(hash === '#search') {
                $('html, body').animate({ scrollTop: "0px" }, 200);
                window.location.hash = '';
                focusSearchBox(500, true);            
            }
            else if(hash === '#top') {
                window.location.hash = '';
                $('html, body').animate({ scrollTop: "0px" }, 300);
            }
            else if(hash.length) {
                window.location = window.location.pathname;
            }
            window.hash_disabled = false;
        });

    focusSearchBox(100, false);
    initSearchForm();
    getBlogPosts();

});