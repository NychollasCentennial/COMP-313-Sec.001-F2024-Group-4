// alert.js
const alertMessage = (type, title, message,position="center",timer="5000") => {
    if (!message) return '';

    let icon;
    switch (type) {
        case 'success':
            icon = 'success';
            break;
        case 'failed':
            icon = 'error';
            break;
        case 'error':
            icon = 'error';
            break;
        case 'warning':
            icon = 'warning';
            break;
        default:
            icon = 'info';
            break;
    }

let ret = `
        <script>
            Swal.fire({
                icon: '${icon}'
                ,title: '${title}'
                ,text: '${message}'
                ,position: '${position}'
                ,timer: '${timer}'
            });
        </script>
    `
    return ret
}

exports.alertMessage = alertMessage;
