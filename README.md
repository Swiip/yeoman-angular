# LiveCoding avec Yeoman & AngularJS

Ce repo contient les [slides](tree/master/slides) et le [code source](tree/master/client) d'un live coding que j'ai donné à quelques reprises, notamment au [LyonJS](http://lyonjs.org), au [DevoxxFR 2013](http://www.devoxx.com/pages/viewpage.action?pageId=6817513) et au [Mix-IT 2013](http://www.mix-it.fr/session/149/live-coding-avec-yeoman-angularjs).

Le repo contient également diverses anciennes version du code dans [repets](tree/master/repets) et le code source du serveur dans [server](tree/master/server).

Dans ce README, je ne referais pas les présentations des technos, pour lesquelles je vous invite à consulter les [slides](http://swiip.github.com/yeoman-angular/slides) mais donnerait simplement quelques explications du code que je donnais à l'oral pendant le live coding.

## Une application CRUD

Pour illustrer au mieux les qualités et les capacités d'AngularJS, j'ai choisis de montrer le développement d'une application CRUD. C'est à dire une application qui permet d'afficher des données, les modifier et les supprimer.

Si ce n'est pas une application qui fait rêver. Le livecoding est l'occasion de montrer qu'avec les bons outils, ce genre d'application que nous sommes tous ammener à faire devient très simple et n'est plus une corvée.

## Yeoman : Yo, Bower, Grunt

Pour commencer le code, je pars d'un répertoire vide. Ou plutôt dans la vrai situation de live coding, je prépare les dépendances Bower & NodeJS sans quoi les téléchargements peuvent durer longtemps.

    yo angular myApp

Permet d'initiailiser tous les ficihers : index.html, bootstrap, Gruntfile.js...

    bower list

Permet ensuite de montrer les dépendances des fichiers qui ont été téléchargés par Bower.

    grunt server

Lance le serveur de test avec live reload préconfiguré par Yeoman.

## Utilisation du serveur, affichage des données

Le serveur contenu dans le répertoire [server](tree/master/server) du repo permet de lancer un serveur Restful en NodeJS / ExpressJS à partir d'un serveur MongoDB. Il y en a deux versions, une qui demande un serveur MongoDB en local sur la machine : [offline.js](tree/master/offline.js) et l'autre qui utilise le service [MongoHQ](http://mongohq.com) : [app.js](tree/master/app.js).

Pour lancer le serveur, simplement executer la commande

    node offline

ou

    node app

Une fois le serveur lancé, on configure un resource AngularJS avec le module optionnel d'Angular ngResource avec le code :

    .factory('Frameworks', function($resource) {
      return $resource('http://localhost\\:1234/frameworks/:id', {
        id: '@_id'
      });
    });

On insère dans la vue, un tableau affichant les données avec le code

    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>URL</th>
        <tr>
      </thead>
      <tbody>
        <tr ng-repeat="framework in frameworks" ng-click="edit(framework)">
          <td>{{framework.name}}</td>
          <td>{{framework.url}}</td>
        </tr>
      </tbody>
    </table>

Enfin, on utilise le service Rest dans le controlleur pour charger les données :

    angular.module('mixitApp')
      .controller('MainCtrl', function ($scope, Frameworks) {
        $scope.frameworks = Frameworks.query();
      });

## Modification, Création et Suppression

Pour la modification, on ajoute une modal bootstrap dans la vue avec le code :

    <div class="modal hide fade">
      <div class="modal-header">
        <h3>Edit</h3>
      </div>
      <div class="modal-body">
        <label>Name</label>
        <input type="text" ng-model="framework.name"/>
        <label>URL</label>
        <input type="text" ng-model="framework.url"/>
      </div>
      <div class="modal-footer">
        <button class="btn" ng-click="save()">Save</button>
      </div>
    </div>

Puis, on instrumente les boutons en ajoutant les fonctions edit, save et delete dans le scope.

    $scope.edit = function(framework) {
      $scope.framework = framework;
      modal.modal('show');
    }

    $scope.save = function() {
      if($scope.framework.$save) {
        $scope.framework.$save();
      } else {
        $scope.frameworks.push(Frameworks.save($scope.framework));
      }
      modal.modal('hide');
    }

    $scope.delete = function(framework, $index, $event) {
      $event.stopPropagation();
      $scope.frameworks.splice($index, 1);
      framework.$delete();
    }

## Conclusion

A partir de zero et en très peu de ligne. Ces outils permettent d'avoir une interface aboutie et performante.

Les indications du README sont forcement bien moins détaillé qu'en présentation, n'hésitez pas à me contacter si certaines choses ne sont pas clair.