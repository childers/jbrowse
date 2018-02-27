require([
            'JBrowse/Browser',
            'JBrowse/Store/SeqFeature/VCFTabix',
            'JBrowse/Model/XHRBlob'
        ],
        function(
            Browser,
            VCFStore,
            XHRBlob
        ) {
describe('VCF store', function() {



  xit('reads big dbsnp', function() {
         var store = new VCFStore({
             browser: new Browser({unitTestMode: true}),
             config: {
                 urlTemplate: '../../../data/big_vcf/00-All.vcf.gz',
                 baseUrl: '.'
             },
             refSeq: { name: 'chr10', start: 0, end: 135534747 }
         });

         var features = [];
         waitsFor( function() { return features.done; } );
         store.getFeatures({ ref: 'chr10',
                             start: 33870887,
                             end: 33896487
                           },
                           function(f) { features.push( f ); },
                           function( ) { features.done = true; },
                           function(e) { console.error(e.stack||''+e); }
                          );
         runs(function() {
                  expect(features.length).toEqual( 560 );
         });

  });

  it('no newline in VCF genotypes', function() {
         var store = new VCFStore({
             browser: new Browser({unitTestMode: true}),
             config: {
                 urlTemplate: '../../docs/tutorial/data_files/volvox.test.vcf.gz',
                 baseUrl: '.'
             },
             refSeq: { name: 'ctgA', start: 0, end: 50000 }
         });

         var features = [];
         waitsFor( function() { return features.done; } );
         store.getFeatures({ ref: 'ctgA',
                             start: 0,
                             end: 7000
                           },
                           function(f) { features.push( f ); },
                           function( ) { features.done = true; },
                           function(e) { console.error(e.stack||''+e); }
                          );
         runs(function() {
                  var gt = features[0].get('genotypes');
                  var names = Object.keys(gt);
                  var last = names[names.length-1];
                  expect(last.match("\n")).toEqual(null);
         });

  });

  it('parses END field', function() {
         var store = new VCFStore({
             browser: new Browser({unitTestMode: true}),
             config: {
                 urlTemplate: '../data/vcf.end.gz',
                 baseUrl: '.'
             },
             refSeq: { name: '1', start: 0, end: 50000 }
         });

         var features = [];
         waitsFor( function() { return features.done; } );
         store.getFeatures({ ref: '1',
                             start: 0,
                             end: 5000
                           },
                           function(f) { features.push( f ); },
                           function( ) { features.done = true; },
                           function(e) { console.error(e.stack||''+e); }
                          );
         runs(function() {
                  var f0 = features[0];
                  console.log(features);
                  console.log(f0);
                  expect(features.length).toEqual( 2 );
         });

  });



});
});
