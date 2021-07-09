import { SlugParams } from "@types";

function getAction( { registration, actionPrimary, code, actionSecondary }: SlugParams ) {
  const conditionals = {
    getBonds: !registration && !actionPrimary && !code && !actionSecondary,
    getCourses: registration && !actionPrimary && !code && !actionSecondary,

    getSchedulesOfBond: registration && actionPrimary === "schedules" && !code && !actionSecondary,
    getNewsOfBond: registration && actionPrimary === "news" && !code && !actionSecondary,
    getHomeworksOfBond: registration && actionPrimary === "homeworks" && !code && !actionSecondary,
    getGradesOfBond: registration && actionPrimary === "grades" && !code && !actionSecondary,


    getCourseDetails: registration && actionPrimary === "course" && code && ( actionSecondary === "details" || !actionSecondary ),

    getCourseGrades: registration && actionPrimary === "course" && code && actionSecondary === "grades",
    getCourseHomeworks: registration && actionPrimary === "course" && code && actionSecondary === "homeworks",
    getCourseNews: registration && actionPrimary === "course" && code && actionSecondary === "news", // // /home/REGISTRATION/course/CODE/news
  } as unknown as Array<any>
  
  for ( const key in conditionals ) {
    if ( Object.prototype.hasOwnProperty.call( conditionals, key ) ) {
      const conditional = conditionals[key] as boolean;
      if ( conditional ) {
        return key
      }
    }
  }
}

export default getAction