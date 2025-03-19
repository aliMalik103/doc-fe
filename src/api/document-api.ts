import ApiService from '.';
import { ApiResponse } from './models/api-response.model';

class DocumentApi {
    addDocumentApi = async (data: FormData): Promise<ApiResponse> => {
      return ApiService.post(`document-parser/ocr`, data, {
        headers: {
        },
      })
        .then((result) => ({
          error: false,
          data: result.data,
        }))
        .catch((err) => {
          console.log('Upload Error:', err);
          return { error: true, data: err };
        });
    };
  }
  
  export const documentRequests = new DocumentApi();

