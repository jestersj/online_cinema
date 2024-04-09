export interface IReview {
    id: number
    author: string
    title: string
    type: 'Позитивный' | 'Негативный' | 'Нейтральный'
    review: string
}