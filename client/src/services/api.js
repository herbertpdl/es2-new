import axios from 'axios'
import { HTTP, HTTP_TOKEN } from './http';

// LOGIN
export function login(data) {
  return HTTP.post(`auth`, data).then(resp => resp.data)
}

export function getUsers() {
  return HTTP_TOKEN.get(`users`).then(resp => resp.data )
}

export function getTeachers() {
  return HTTP_TOKEN.get(`teachers`).then(resp => resp.data )
}

export function getUser(id) {
  return HTTP_TOKEN.get(`user/${id}`).then(resp => resp.data)
}

export function saveUser(data) {
  return HTTP_TOKEN.post(`user`, data).then(resp => resp.data)
}

export function deleteUser(id) {
  return HTTP_TOKEN.delete(`user/${id}`).then(resp => resp.data)
}

export function updateUser(id, data) {
  return HTTP_TOKEN.put(`user/${id}`, data).then(resp => resp.data)
}

// COURSES
export function getCourses() {
  return HTTP_TOKEN.get(`courses`).then(resp => resp.data)
}

export function getCourse(id) {
  return HTTP_TOKEN.get(`course/${id}`).then(resp => resp.data)
}

export function saveCourse(data) {
  return HTTP_TOKEN.post(`course`, data).then(resp => resp.data)
}

export function deleteCourse(id) {
  return HTTP_TOKEN.delete(`course/${id}`).then(resp => resp.data)
}

export function updateCourse(id, data) {
  return HTTP_TOKEN.put(`course/${id}`, data). then(resp => resp.data)
}

// MATTERS
export function getMatters() {
  return HTTP_TOKEN.get(`matters`).then(resp => resp.data)
}

export function getMatter(id) {
  return HTTP_TOKEN.get(`matter/${id}`).then(resp => resp.data)
}

export function updateMatter(id, data) {
  return HTTP_TOKEN.put(`matter/${id}`, data).then(resp => resp.data)
}

export function saveMatter(data) {
  return HTTP_TOKEN.post(`matter`, data).then(resp => resp.data)
}

export function deleteMatter(id) {
  return HTTP_TOKEN.delete(`matter/${id}`).then(resp => resp.data)
}

// QUESTIONS
export function getQuestions() {
  return HTTP_TOKEN.get(`question`).then(resp => resp.data)
}

export function getQuestion(id) {
  return  HTTP_TOKEN.get(`question/${id}`).then(resp => resp.data)
}

export function saveQuestion(data) {
  return  HTTP_TOKEN.post(`question`, data).then(resp => resp.data)
}

export function deleteQuestion(id) {
  return  HTTP_TOKEN.delete(`question/${id}`).then(resp => resp.data)
}

export function updateQuestion(id, data) {
  return HTTP_TOKEN.put(`question/${id}`, data).then(resp => resp.data)
}

// ALTERNATIVES
export function getAlternativesByQuestion(id) {
  return HTTP_TOKEN.get(`alternatives/${id}`).then(resp => resp.data)
}

// SURVEYS
export function registerSurvey(data) {
  return HTTP_TOKEN.post(`survey`, data).then(resp => resp.data)
}

export function getSurvey(id) {
  return HTTP_TOKEN.get(`survey/${id}`).then(resp => resp.data)
}

export function getSurveysByType(type) {
  return HTTP_TOKEN.get(`surveys/${type}`).then(resp => resp.data)
}

export function getSurveysByTypeUser(type, idUser) {
  return HTTP_TOKEN.get(`surveys/${type}/${idUser}`).then(resp => resp.data)
}

export function saveSurveyAnswers(data) {
  return HTTP_TOKEN.post(`survey-answer`, data).then(resp => resp.data)
}

export function getAnswersBySurveyQuestion(idSurvey, idQuestion) {
  return HTTP_TOKEN.get(`survey-answer/${idSurvey}/${idQuestion}`).then(resp => resp.data)
}

export function getSurveysByCourse(idCourse, idUser) {
  return HTTP_TOKEN.get(`course-surveys/${idCourse}/${idUser}`). then(resp => resp.data)
}