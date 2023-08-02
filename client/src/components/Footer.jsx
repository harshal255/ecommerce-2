import { Typography } from "@material-tailwind/react";
import SITEMAP from "../api/Footer";


const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bottom-0 left-0 right-0 hidden md:block">
      <div className="w-full p-6">
        <div className="flex flex-wrap -mt-1 ts:-mx-2">
          {SITEMAP.map(({ title, links }, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2">
              <Typography
                variant="small"
                color="black"
                className="mb-4 divide-gray-300 uppercase"
              >
                {title}
              </Typography>
              <ul className="space-y-1 text-gray-300">
                {links.map(({ text, icon: Icon, href, inputPlaceholder, buttonText }, index) => (
                  <Typography
                    key={index}
                    as="li"
                   
                    className="font-normal"
                    style={{
                      fontWeight: 400,
                      fontSize: '15px',
                      lineHeight: '26px',
                      color: '#404040',
                    }}
                  >
                    {href ? (
                      <a
                        href={href}
                        className="inline-block py-1 pr-2 text-gray-500 transition-transform hover:scale-105 hover:text-black dark:hover:text-black"
                      >
                        {Icon && <Icon />}
                        {text}
                      </a>
                    ) : (
                      <div className="flex items-center">
                        {Icon && <Icon />}
                        <div>
                          <div className="mb-1">{text}</div>
                          {inputPlaceholder && (
                            <div className="ml-auto flex">
                              <input
                                type="email"
                                placeholder={inputPlaceholder}
                                className=""
                              />
                              <button
                                type="button"
                                className="bg-pink-500 text-white px-4 py-1 rounded-r hover:bg-pink-600 focus:outline-none"
                              >
                                {buttonText}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Typography>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-screen-3xl flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="text-center font-normal text-blue-gray-900 md:mb-0"
          >
            Copyright &copy; {currentYear} <a href="https://looknbookart.com/">Loooknbook</a> all
            rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
}