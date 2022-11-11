import { renderToString } from "react-dom/server";

let notificationCount = 0;
let notificationContainer: HTMLElement | null = null;

const createNitificationContainer = () => {
  const container = document.createElement("div");
  container.className = "fixed top-2 right-2 flex flex-col overflow-hidden";
  document.body.appendChild(container);
  return container;
};

const createOneNotification = (num: number) => {
  const wrapper = document.createElement("div");
  const title = document.createElement("h3");
  const content = document.createElement("main");

  wrapper.className = "flex flex-col border border-red-400 mb-2 animate-notification-enter";
  title.className = "font-bold";
  content.className = "font-thin";

  title.textContent = `notification title ${num}`;
  content.innerHTML = renderToString(
    num % 2 ? (
      <p>notification content</p>
    ) : (
      <div>
        <p>ooooo</p>
        <p>kkkkkkk</p>
      </div>
    )
  );

  wrapper.appendChild(title);
  wrapper.appendChild(content);

  return wrapper;
};

const notification = (num: number) => {
  if (!notificationContainer) {
    notificationContainer = createNitificationContainer();
  }

  const oneNotification = createOneNotification(num);
  notificationContainer.appendChild(oneNotification);
  notificationCount += 1;

  oneNotification.addEventListener("animationend", () => {
    if (oneNotification.classList.contains("animate-notification-enter")) {
      oneNotification.classList.remove("animate-notification-enter");
    } else {
      oneNotification.remove();
      notificationCount -= 1;

      if (notificationCount === 0) {
        notificationContainer?.remove();
        notificationContainer = null;
      }
    }
  });

  setTimeout(() => {
    oneNotification.classList.add("animate-notification-leave");
  }, 1000 * (Math.random() * 9 + 1));
};

let count = 1;

export const Notification = () => {
  const handleClick = () => {
    notification(count++);
  };

  return (
    <>
      <button onClick={handleClick} className="">
        open notification
      </button>
    </>
  );
};
