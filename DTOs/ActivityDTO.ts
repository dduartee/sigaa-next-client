export interface IActivityData {
  type: string;
  date: Date;
  done: boolean;
  courseTitle: string;
  examDescription?: string;
  homeworkId?: string;
  homeworkTitle?: string;
  quizId?: string;
  quizTitle?: string;
}
export interface IActivityDTOProps {
  id?: string;
  title: string;
  type: string;
  date: string;
  done: boolean;
  course: { title: string };
}
export interface IActivityDTO {
  toJSON(): IActivityDTOProps;
}

export class ActivityDTO implements IActivityDTO {
  constructor(public activity: IActivityData) {}

  toJSON(): IActivityDTOProps {
    let title = "";
    let id: string | undefined;
    switch (this.activity.type) {
      case "exam":
        title = this.activity.examDescription as string;
        id = undefined;
        break;
      case "homework":
        title = this.activity.homeworkTitle as string;
        id = this.activity.homeworkId;
        break;
      case "quiz":
        title = this.activity.quizTitle as string;
        id = this.activity.quizId;
        break;
    }
    return {
      id,
      title,
      type: this.activity.type,
      date: this.activity.date.toISOString(),
      done: this.activity.done,
      course: { title: this.activity.courseTitle },
    };
  }
  static fromJSON(json: IActivityDTOProps) {
    return new ActivityDTO({
      type: json.type,
      date: new Date(json.date),
      done: json.done,
      courseTitle: json.course.title,
      homeworkTitle: json.title,
      homeworkId: json.id,
    });
  }
}
