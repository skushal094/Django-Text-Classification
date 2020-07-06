from django.shortcuts import render
import pickle
import os


def home(request):
    context = {}
    if request.method == "POST":
        news = request.POST.get('news', None)
        model_pickle_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'trained_models',
                                         'RandomForest.pickle')
        with open(model_pickle_path, "rb") as f:
            model = pickle.load(f)
        category_proba = dict(zip(model.classes_, model.predict_proba([news, ])[0]))
        category = model.predict([news])[0]
        context.update({'news': news, 'result': category_proba, 'category': category})
    return render(request, 'ml_models/home.html', context=context)
