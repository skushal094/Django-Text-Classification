from django.shortcuts import render, HttpResponse
import pickle
import os

# Create your views here.
def random_forest(request):
    if request.method == "GET":
        return render(request, 'ml_models/text_form.html', {})
    else:
        news = request.POST.get('news', None)
        model_pickle_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'trained_models', 'RandomForest.pickle')
        with open(model_pickle_path, "rb") as f:
            model = pickle.load(f)
        category = model.predict([news,])[0]
        return render(request, 'ml_models/text_form.html', {'news': news, 'result': category})
