/*!
 * CSC (Cascading style component)
 * Author: Jorge Maxiliano Toledo
 * Type: SCSS/CSS Framework
 * Version: 1.4.5
 * GitHub: https://github.com/KagariSoft/csc
 */

const $ = (selector) => document.querySelector(selector);
const $All = (selector) => document.querySelectorAll(selector);

const menu = $("[data-togglemenu]");

if (menu) {
  menu.addEventListener("click", function () {
    document.querySelectorAll("[data-menulist]").forEach((item) => {
      item.classList.toggle("kg-show__list");
    });
  });
}

//Credits: https://codepen.io/chriscoyier/pen/XWNqxyY
class Accordion {
  constructor(el) {
    // Store the <details> element
    this.el = el;
    // Store the <summary> element
    this.summary = el.querySelector("[data-summary]");
    // Store the <div class="content"> element
    this.content = el.querySelector("[data-content-summary]");

    // Store the animation object (so we can cancel it if needed)
    this.animation = null;
    // Store if the element is closing
    this.isClosing = false;
    // Store if the element is expanding
    this.isExpanding = false;
    // Detect user clicks on the summary element
    this.summary.addEventListener("click", (e) => this.onClick(e));
  }

  onClick(e) {
    // Stop default behaviour from the browser
    e.preventDefault();
    // Add an overflow on the <details> to avoid content overflowing
    this.el.style.overflow = "hidden";
    // Check if the element is being closed or is already closed
    if (this.isClosing || !this.el.open) {
      this.open();
      this.summary.querySelector("[data-icon-datalist]").style.transform =
        "rotate(0deg)";

      // Check if the element is being openned or is already open
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
      this.summary.querySelector("[data-icon-datalist]").style.transform =
        "rotate(-90deg)";
    }
  }

  shrink() {
    // Set the element as "being closed"
    this.isClosing = true;

    // Store the current height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the height of the summary
    const endHeight = `${this.summary.offsetHeight}px`;

    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }

    // Start a WAAPI animation
    this.animation = this.el.animate(
      {
        // Set the keyframes from the startHeight to endHeight
        height: [startHeight, endHeight],
      },
      {
        duration: 400,
        easing: "ease-out",
      }
    );

    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(false);
    // If the animation is cancelled, isClosing variable is set to false
    this.animation.oncancel = () => (this.isClosing = false);
  }

  open() {
    // Apply a fixed height on the element
    this.el.style.height = `${this.el.offsetHeight}px`;
    // Force the [open] attribute on the details element
    this.el.open = true;
    // Wait for the next frame to call the expand function
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    // Set the element as "being expanding"
    this.isExpanding = true;
    // Get the current fixed height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the open height of the element (summary height + content height)
    const endHeight = `${
      this.summary.offsetHeight + this.content.offsetHeight
    }px`;

    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }

    // Start a WAAPI animation
    this.animation = this.el.animate(
      {
        // Set the keyframes from the startHeight to endHeight
        height: [startHeight, endHeight],
      },
      {
        duration: 400,
        easing: "ease-out",
      }
    );
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(true);
    // If the animation is cancelled, isExpanding variable is set to false
    this.animation.oncancel = () => (this.isExpanding = false);
  }

  onAnimationFinish(open) {
    // Set the open attribute based on the parameter
    this.el.open = open;
    // Clear the stored animation
    this.animation = null;
    // Reset isClosing & isExpanding
    this.isClosing = false;
    this.isExpanding = false;
    // Remove the overflow hidden and the fixed height
    this.el.style.height = this.el.style.overflow = "";
  }
}

const DataList = $All("[data-datalist]");
if (DataList) {
  DataList.forEach((el) => {
    new Accordion(el);
  });
}

// 3D Image animation
const Container3D = $All("[data-3d]");

if (Container3D) {
  Container3D.forEach((el) => {
    const { width, height } = el.getBoundingClientRect();

    const halfWidth = width / 2;

    const halfHeight = height / 2;

    el.addEventListener("mousemove", (e) => {
      const { offsetX, offsetY } = e;
      const rotationX = ((offsetX - halfWidth) / halfWidth) * 10;
      const rotationY = ((offsetY - halfHeight) / halfHeight) * 10;

      const children = el?.children[0];
      console.log(children);

      if (children) {
        children.style.transition = "none";
        children.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
      }
    });

    el.addEventListener("mouseleave", (e) => {
      const children = el?.children[0];

      if (children) {
        children.style.transition = "transform .5s ease-in-out";
        children.style.transform = `rotateX(0deg) rotateY(0deg)`;
      }
    });
  });
}
