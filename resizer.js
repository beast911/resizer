"user strict";
/**
 * @copyright Kanwar Singh
 * 
 * This library allows user to have resizing capabilities to an image in the most basic form. Just provide a container id and image id, and you are good to go.
 * 
 * @name Resizer
 * 
 */

(function (window) {
    let Resizer = function (containerId, imageId, zoomInButtonId, zoomOutButtonId, resetButtonId) {
        this.img_ele = null,
            this.x_cursor = 0,
            this.y_cursor = 0,
            this.x_img_ele = 0,
            this.y_img_ele = 0;
        this.init(containerId, imageId, zoomInButtonId, zoomOutButtonId, resetButtonId)
    };

    function resetSize(imageId) {
        this.img_ele = document.getElementById(imageId);
        this.img_ele.style.width = "100%";
        this.img_ele.style.height = "100%";
        this.img_ele.style.left = 0;
        this.img_ele.style.top = 0;
        this.img_ele = null;
    }

    function zoom(imageId, zoomincrement) {
        this.img_ele = document.getElementById(imageId);
        let pre_width = this.img_ele.getBoundingClientRect().width, pre_height = this.img_ele.getBoundingClientRect().height;
        this.img_ele.style.width = (pre_width * zoomincrement) + 'px';
        this.img_ele.style.height = (pre_height * zoomincrement) + 'px';
        this.img_ele = null;
    }

    function start_drag(imageId) {
        this.img_ele = document.getElementById(imageId);
        this.x_img_ele = window.event.clientX - this.img_ele.offsetLeft;
        this.y_img_ele = window.event.clientY - this.img_ele.offsetTop;
    }

    function stop_drag() {
        this.img_ele = null;
    }

    function while_drag() {
        this.x_cursor = window.event.clientX;
        this.y_cursor = window.event.clientY;
        if (this.img_ele) {
            this.img_ele.style.left = (this.x_cursor - this.x_img_ele) + 'px';
            this.img_ele.style.top = (window.event.clientY - this.y_img_ele) + 'px';
        }
    }

    Resizer.prototype = {
        constructor: Resizer,
        init: function (containerId, imageId, zoomInButtonId, zoomOutButtonId, resetButtonId) {
            let self = this;
            if (zoomInButtonId && zoomOutButtonId && resetButtonId) {
                document.getElementById(zoomOutButtonId).addEventListener('click', function () {
                    zoom.call(self, imageId, 0.25);
                });
                document.getElementById(zoomInButtonId).addEventListener('click', function () {
                    zoom.call(self, imageId, 1.25);
                });
                document.getElementById(resetButtonId).addEventListener('click', function () {
                    resetSize.call(self, imageId);
                });
            }
            document.getElementById(imageId).addEventListener('mousedown', start_drag.bind(self, imageId));
            document.getElementById(containerId).addEventListener('mousemove', while_drag.bind(self, imageId));
            document.getElementById(containerId).addEventListener('mouseup', stop_drag.bind(self));
        }
    }

    window.Resizer = Resizer;
})(window);
