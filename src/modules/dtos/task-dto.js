module.exports = class TaskDto {
  title;
  text;
  isCheck;
  creationTime;

  constructor(model) {
    this.title = model.title;
    this.text = model.text;
    this.isCheck = model.isCheck;
    this.creationTime = model.creationTime;
  }
}