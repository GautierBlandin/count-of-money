/**
 * @interface CryptoCurrencyInterface - The abstract interface representing a cryptocurrency
 */
export interface CryptoCurrencyInterface{
  uuid: string
  name: string
  symbol: string
  imageURL: string
  geckoID: string
}

/**
 * @interface GetCryptoCurrencyRequest - The abstract interface for a cryptocurrency database fetching request
 */
export interface GetCryptoCurrencyRequest extends  Partial<CryptoCurrencyInterface>{}

/**
 * @interface CreateCryptoCurrencyRequest - The abstract interface for a cryptocurrency creation request
 */
export interface CreateCryptoCurrencyRequest extends Omit<CryptoCurrencyInterface, 'uuid'>{
}

/**
 * @interface UpdateCryptoCurrencyRequest - The abstract interface for a cryptocurrency update request
 */
export interface UpdateCryptoCurrencyRequest extends Omit<CryptoCurrencyInterface, 'uuid'>
{
  uuid: string
}

/**
 * @interface DeleteCryptoCurrencyRequest - The abstract interface for a cryptocurrency deletion request
 */
export interface DeleteCryptoCurrencyRequest extends Omit<Partial<CryptoCurrencyInterface>, 'imageURL'> {}