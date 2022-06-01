//Изначально в html все картинки должны быть в webp. А потом этот скрипт поменяет их на старые расширения если webp не поддерживается ос или браузером
//Картинки должны быть изначально в webp, иначе Google PageSpeed их не увидит, если их вставить после загрузки dom

//Определяем ОС
const OS = (() => {
    const platform = navigator.platform.toLowerCase(),
        iosPlatforms = ['iphone', 'ipad', 'ipod', 'ipod touch'];

    if (platform.includes('mac')) return 'MacOS';
    if (iosPlatforms.includes(platform)) return 'iOS';
    if (platform.includes('win')) return 'Windows';
    if (/android/.test(navigator.userAgent.toLowerCase())) return 'Android';
    if (/linux/.test(platform)) return 'Linux';

    return 'unknown';
})();

// Функция проверки поддержки браузером формата webp
let canUseWebp = function () {
    // Создаем элемент canvas
    let elem = document.createElement('canvas');
    // Приводим элемент к булеву типу
    if (!!(elem.getContext && elem.getContext('2d'))) {
        // Создаем изображение в формате webp, возвращаем индекс искомого элемента и сразу же проверяем его
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
    // Иначе Webp не используем

    return false;
}


// Устанавливаем тэгу html класс webp или no-webp, чтобы в стилях ставить нужные картинки
const setClassToBody = (() => {
    document.documentElement;
    //Ставим webp класс только если браузер поддерживает и ОС не MacOS
    if (canUseWebp && OS != "MacOS") {
        document.documentElement.classList.add('webp')
        document.documentElement.classList.remove('no-webp')
    } else {
        document.documentElement.classList.add('no-webp')
        document.documentElement.classList.remove('webp')
    }
})();



//Изначально в вёрстке все картинки в webp. В каждой подпапке webp-картинки в папке webp. Если браузер не поддерживает webp, то скрипт ставит тэгам img и image src и href на картинку на уровень выше и расширение ставит из атрибута data-ext



document.addEventListener('DOMContentLoaded', () => {
    const allImgTags = document.querySelectorAll('img');
    const allImageTags = document.querySelectorAll('image');
    //все тэги, для которых будем менять источник изображения, если браузер НЕ поддерживает webp


    //функция будем менять директории файлов для тэгов на такие, чтоб без webp
    function iterateTags(tagsList, attr) {

        for (let c = 0; c < tagsList.length; c++) {

            const curTag = tagsList[c]; //tag
            //const curImgTagOuterHTML = allImgTags[c].outerHTML; //outerHtml return type = string       


            const attrVal = curTag.getAttribute(attr).toLowerCase();
            //значение аттрибута src ИЛИ href ИЛИ и т.д. в формате string в нижнем регистре


            const fileDirWithoutFile = attrVal.slice(0, attrVal.lastIndexOf("/"));
            //путь до файла (не включает название файла с расширением)

            const fileNameWithExt = attrVal.substring(attrVal.lastIndexOf("/") + 1);
            //название файла с расширением (пример: pic.jpg)

            const fileNameWithoutExt = fileNameWithExt.slice(0, fileNameWithExt.lastIndexOf("."));

            const fileExt = attrVal.substring(attrVal.lastIndexOf(".") + 1);
            //расширение файла .jpg или любое другое


            //console.log(srcVal);
            //console.log(fileDirWithoutFile);
            //console.log(fileNameWithExt);
            //console.log(fileNameWithoutExt);
            //console.log(fileExt);

            //если путь до файла содержит /webp
            if (fileDirWithoutFile.includes('/webp')) {
                //если картинки лежат в папке /webp
                
                
                const regExForWebp = /(.*?)(=?\/webp)/gi; //всё до слова /webp (\/webp - экранирование обр слэша)
                //нужно чтобы убрать /webp из строки пути до файла

                const res = regExForWebp.exec(fileDirWithoutFile);
                
                 //На позиции 0 находится сама строка
                //На позиции 1 находится все что совпадает до слова /webp (первая группа)
                //На позиции 2 находится слово hello (вторая группа)

                const fileDirWithoutWebp = res[1]; //папка на уровень выше папки webp
                
                
                
                const defaultExt = curTag.getAttribute('data-ext'); //там написано с каким расширением картинка лежит на уровень выше папки webp
                
                //новый путь до картинки. на уровень выше папки webp и с дефолтным расширением
                const newDirToFile = `${fileDirWithoutWebp}/${fileNameWithoutExt}.${defaultExt}`;
                
                curTag.setAttribute(attr, newDirToFile);
            }
           


        }
    }

    //если webp не поддерживается
    if(!canUseWebp || OS == 'MacOs' || document.documentElement.classList.contains('no-webp')){
        iterateTags(allImgTags, 'src');
        
    }

})
