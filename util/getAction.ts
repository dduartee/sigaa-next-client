import { SlugParams } from "@types";

function getAction( { registration, actionPrimary, code, actionSecondary }: SlugParams ) {
  const conditionals = {
    getCourses: registration && !actionPrimary && !code && !actionSecondary, // /home/REGISTRATION/

    getNewsOfBond: registration && actionPrimary === "news" && !code && !actionSecondary, // /home/REGISTRATION/news/
    getHomeworksOfBond: registration && actionPrimary === "homeworks" && !code && !actionSecondary, // /home/REGISTRATION/homeworks/
    getGradesOfBond: registration && actionPrimary === "grades" && !code && !actionSecondary, // /home/REGISTRATION/grades


    getCourseDetails: registration && actionPrimary === "course" && code && ( actionSecondary === "details" || !actionSecondary ),// /home/REGISTRATION/course/CODE/ OR /home/REGISTRATION/course/CODE/details

    getCourseGrades: registration && actionPrimary === "course" && code && actionSecondary === "grades",// /home/REGISTRATION/course/CODE/grades
    getCourseHomeworks: registration && actionPrimary === "course" && code && actionSecondary === "homeworks", // /home/REGISTRATION/course/CODE/homeworks
    getCourseNews: registration && actionPrimary === "course" && code && actionSecondary === "news", // // /home/REGISTRATION/course/CODE/news
  } as any
  for ( const key in conditionals ) {
    if ( Object.prototype.hasOwnProperty.call( conditionals, key ) ) {
      const conditional = conditionals[key] as boolean;
      if ( conditional ) {
        console.log(key)
        return key
      }
    }
  }
}

export default getAction