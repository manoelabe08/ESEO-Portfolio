
document.addEventListener('DOMContentLoaded', function () {
    const currentLocation = location.pathname;
    const menuItems = document.querySelectorAll('.navbar-menu a');

    menuItems.forEach(item => {
        let href = item.getAttribute('href');

        if (currentLocation === '/') {
            href === 'index.html' && (item.className = 'active');
        } else if (currentLocation.includes(href)) {
            item.classList.add('active');
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
