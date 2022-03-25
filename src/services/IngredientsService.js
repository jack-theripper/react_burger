const API_ = 'https://norma.nomoreparties.space/api/ingredients';

export default class IngredientsService {
	
	static async getAll() {
		const response = await fetch(API_);
		
		return await response.json(); // @todo: success === true
	}
	
}