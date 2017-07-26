export const tempSource = `
<document xmlns="http://cnx.rice.edu/cnxml" xmlns:md="http://cnx.rice.edu/mdml" xmlns:bib="http://bibtexml.sf.net/" xmlns:m="http://www.w3.org/1998/Math/MathML" xmlns:q="http://cnx.rice.edu/qml/1.0" id="new" cnxml-version="0.7" module-id="new">

  <title>Vol I - Unit 1: Mechanics - 10 Fixed-Axis Rotation - Module: Rotation with Constant Angular Acceleration</title>
  <metadata xmlns:md="http://cnx.rice.edu/mdml" mdml-version="0.5">
    <!-- WARNING! The 'metadata' section is read only. Do not edit below.
       Changes to the metadata section in the source will not be saved. -->
    <md:repository>http://legacy.cnx.org/content</md:repository>
    <md:content-id>new</md:content-id>
    <md:title>Vol I - Unit 1: Mechanics - 10 Fixed-Axis Rotation - Module: Rotation with Constant Angular Acceleration</md:title>
    <md:version>1,4</md:version>
    <md:created>2017/02/15 03:07:28.569 US/Central</md:created>
    <md:revised>2017/02/20 04:23:48.511 US/Central</md:revised>
    <md:actors>
      <md:person userid="katalysteducation">
        <md:firstname>Katalyst</md:firstname>
        <md:surname>Education</md:surname>
        <md:fullname>Katalyst Education</md:fullname>
        <md:email>katalyst.education@gmail.com</md:email>
      </md:person>
    </md:actors>
    <md:roles>
      <md:role type="author">katalysteducation</md:role>
      <md:role type="maintainer">katalysteducation</md:role>
      <md:role type="licensor">katalysteducation</md:role>
    </md:roles>
    <md:license url="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution License 4.0</md:license>
    <!-- For information on license requirements for use or modification, see license url in the
       above <md:license> element.
       For information on formatting required attribution, see the URL:
         CONTENT_URL/content_info#cnx_cite_header
       where CONTENT_URL is the value provided above in the <md:content-url> element.
  -->
    <md:derived-from url="http://legacy.cnx.org/content/m58327/1.4/"></md:derived-from>
    <md:keywordlist>
      <md:keyword>Kinematics of rotational motion</md:keyword>
    </md:keywordlist>
    <md:subjectlist>
      <md:subject>Science and Technology</md:subject>
    </md:subjectlist>
    <md:abstract>By the end of this section, you will be able to:
      <list>
        <item>Derive the kinematic equations for rotational motion with constant angular acceleration</item>
        <item>Select from the kinematic equations for rotational motion with constant angular acceleration the appropriate equations to solve for unknowns in the analysis of systems undergoing fixed-axis rotation</item>
        <item>Use solutions found with the kinematic equations to verify the graphical analysis of fixed-axis rotation with constant angular acceleration</item>
      </list>
    </md:abstract>
    <md:language>pl</md:language>
    <!-- WARNING! The 'metadata' section is read only. Do not edit above.
       Changes to the metadata section in the source will not be saved. -->
  </metadata>


  <content>
    <note id="fs-idm338602336">
      <title>W tym podrozdziale nauczysz się</title>
      <list id="ked-1bko0maj4_d5o">
        <item>napisać równania kinetyczne dla obrotów ze stałym przyspieszeniem kątowym;</item>
        <item>wybrać spośród równań opisujących obroty ze stałym przyspieszeniem kątowym właściwe równanie zawierające niewiadome, występujące w analizie układów wykonujących obroty wokół stałej osi;</item>
        <item>użyć rozwiązania, otrzymanego w wyniku zastosowania równań kinetycznych, do zweryfikowania graficznej analizy obrotów wokół stałej osi ze stałym przyspieszeniem kątowym.</item>
      </list>
      <para id="ked-1bko0ot3c_m3g">W poprzednim rozdziale zdefiniowaliśmy zmienne obrotowe: przemieszczenie kątowe, prędkość kątową oraz przyspieszenie kątowe. W tym rozdziale wyprowadzimy zależności pomiędzy tymi wielkościami, a następnie użyjemy je do
        opisu ruchu obrotowego wokół stałej osi ze stałym przyspieszeniem kątowym . W ten sposób sformułujemy podstawowe równania kinetyczne dla ruchu obrotowego. Jeżeli przyspieszenie kątowe jest stałe, to równania opisujące kinetykę ruchu obrotowego
        upraszczają się podobnie, jak w przypadku równań dla ruchu postępowego, omówionego w rozdziałach
        <link document="m58281">RUCH WZDŁUŻ LINII PROSTEJ</link>
        oraz
        <link document="m58288">RUCH W DWÓCH I TRZECH WYMIARACH</link>
        . Następnie użyjemy tego uproszczonego układu równań do przedstawienia zastosowań ruchu obrotowego w fizyce i technice, w sytuacjach w których przyspieszenie kątowe jest stałe. Kinematyka ruchu obrotowego jest również warunkiem wstępnym do opisania
        dynamiki ruchu obrotowego w dalszej części tego rozdziału.
      </para>
    </note>
    <section id="ked-1bko13ou5_gn">
      <title>Kinetyka ruchu obrotowego</title>
      <para id="ked-1bko15617_evo">Korzystając z naszej intuicji, rozpoczniemy od określenia w jaki sposób zmienne obrotowe
        <m:math>
          <m:mrow>
            <m:mi>θ</m:mi>
            <m:mo>,</m:mo>
          </m:mrow>
        </m:math>
        <m:math>
          <m:mrow>
            <m:mi>ω</m:mi>
            <m:mo>,</m:mo>
          </m:mrow>
        </m:math>
        <m:math>
          <m:mrow>
            <m:mi>ε</m:mi>
          </m:mrow>
        </m:math>
        i
        <emphasis effect="italics">t</emphasis>
        są ze sobą powiązane. Na przykład w poprzednim rozdziale widzieliśmy, że jeżeli wektor przyspieszenia kątowego koła zamachowego ma ten sam kierunek, co kierunek wektora prędkości, to jego prędkość kątowa wzrasta wraz z upływem czasu, podobnie jak
        jego przemieszczenie kątowe. W przeciwnym przypadku, czyli jeżeli wektor przyspieszenia kątowego jest przeciwnie skierowany do wektora prędkości kątowej, jego prędkość kątowa z upływem czasu maleje. Możemy opisać te przypadki i wiele innych poprzez
        spójny układ równań kinetycznych ruchu obrotowego, przy założeniu stałego przyśpieszenia kątowego. Taką metodę opisu ruchu obrotowego nazywamy
        <term>kinematyką ruchu obrotowego</term>.</para>
      <para id="ked-1bko152ea_5e">Na początek zauważmy, że jeżeli układ obraca się ze stałym przyspieszeniem kątowym, to prędkość kątowa wzrasta liniowo z upływem czasu. Wówczas średnia wartość prędkości kątowej wyraża się jako połowa sumy początkowej i
        końcowej wartości prędkości kątowej:</para>
      <note id="ked-1bko17ngh_neg">
        <equation id="ked-1bko183kk_4g8">
          <m:math>
            <m:mrow>
              <m:mover accent="true">
                <m:mi>ω</m:mi>
                <m:mo>–</m:mo>
              </m:mover>
              <m:mo>=</m:mo>
              <m:mfrac>
                <m:mrow>
                  <m:msub>
                    <m:mi>ω</m:mi>
                    <m:mn>0</m:mn>
                  </m:msub>
                  <m:mo>+</m:mo>
                  <m:msub>
                    <m:mi>ω</m:mi>
                    <m:mtext>k</m:mtext>
                  </m:msub>
                </m:mrow>
                <m:mn>2</m:mn>
              </m:mfrac>
              <m:mo>.</m:mo>
            </m:mrow>
          </m:math>
        </equation>
      </note>
      <para id="ked-1bko1gd76_3t">Korzystając z definicji średniej prędkości kątowej, można otrzymać równanie wiążące położenie kątowe ze średnią prędkością kątową i czasem:</para>
      <equation id="ked-1bko1hul4_em">
        <m:math>
          <m:mrow>
            <m:mover accent="true">
              <m:mi>ω</m:mi>
              <m:mo>–</m:mo>
            </m:mover>
            <m:mo>=</m:mo>
            <m:mfrac>
              <m:mrow>
                <m:mtext>Δ</m:mtext>
                <m:mi>θ</m:mi>
              </m:mrow>
              <m:mrow>
                <m:mtext>Δ</m:mtext>
                <m:mi>t</m:mi>
              </m:mrow>
            </m:mfrac>
            <m:mo>.</m:mo>
          </m:mrow>
        </m:math>
      </equation>
      <para id="ked-1bko1i59i_0g">Z powyższego równia otrzymujemy:</para>
      <note id="ked-1bko1kej9_cig">
        <equation id="ked-1bko1khv2_ffg">
          <m:math>
            <m:mrow>
              <m:msub>
                <m:mi>θ</m:mi>
                <m:mtext>k</m:mtext>
              </m:msub>
              <m:mo>=</m:mo>
              <m:msub>
                <m:mi>θ</m:mi>
                <m:mn>0</m:mn>
              </m:msub>
              <m:mo>+</m:mo>
              <m:mover accent="true">
                <m:mi>ω</m:mi>
                <m:mo>–</m:mo>
              </m:mover>
              <m:mi>t</m:mi>
              <m:mo>,</m:mo>
            </m:mrow>
          </m:math>
        </equation>
      </note>
      <para id="ked-1bko1lpku_ncg">gdzie przyjęliśmy, że w chwili początkowej
        <m:math>
          <m:mrow>
            <m:msub>
              <m:mi>t</m:mi>
              <m:mn>0</m:mn>
            </m:msub>
            <m:mo>=</m:mo>
            <m:mn>0</m:mn>
          </m:mrow>
        </m:math>. Równanie to może być bardzo przydatne, gdy znamy średnią prędkość kątową układu, można wówczas wyznaczyć wartość drogi kątowej (kątowego przemieszczenia) w danym okresie czasu. Teraz zajmijmy się otrzymaniem wyrażenia, wiążącego ze sobą
        <m:math>
          <m:mi>ω</m:mi>
        </m:math>,
        <m:math>
          <m:mi>ε</m:mi>
        </m:math>
        oraz
        <emphasis effect="italics">t</emphasis>. Rozpocznijmy od zdefiniowania przyspieszenia kątowego:</para>
      <equation id="ked-1bko1ojg2_ukg">
        <m:math>
          <m:mrow>
            <m:mi>ε</m:mi>
            <m:mo>=</m:mo>
            <m:mfrac>
              <m:mrow>
                <m:mi>d</m:mi>
                <m:mi>ω</m:mi>
              </m:mrow>
              <m:mrow>
                <m:mi>d</m:mi>
                <m:mi>t</m:mi>
              </m:mrow>
            </m:mfrac>
            <m:mo>.</m:mo>
          </m:mrow>
        </m:math>
      </equation>
      <para id="ked-1bko1phc0_33g">Przekształćmy powyższe równanie do postaci
        <m:math>
          <m:mrow>
            <m:mi>ε</m:mi>
            <m:mi>d</m:mi>
            <m:mi>t</m:mi>
            <m:mo>=</m:mo>
            <m:mi>d</m:mi>
            <m:mi>ω</m:mi>
          </m:mrow>
        </m:math>, a następnie scałkujmy obustronnie od wartości początkowej czasu
        <m:math>
          <m:mrow>
            <m:msub>
              <m:mi>t</m:mi>
              <m:mn>0</m:mn>
            </m:msub>
          </m:mrow>
        </m:math>, do wartości końcowej
        <emphasis effect="italics">t</emphasis>
        oraz od
        <m:math>
          <m:mrow>
            <m:msub>
              <m:mi>ω</m:mi>
              <m:mn>0</m:mn>
            </m:msub>
            <m:mspace width="0.2em"/>
            <m:mtext>do</m:mtext>
            <m:mspace width="0.2em"/>
            <m:msub>
              <m:mi>ω</m:mi>
              <m:mtext>k</m:mtext>
            </m:msub>
          </m:mrow>
        </m:math>
        Ponieważ przyspieszenie kątowe
        <m:math>
          <m:mrow>
            <m:msub>
              <m:mi>t</m:mi>
              <m:mn>0</m:mn>
            </m:msub>
          </m:mrow>
        </m:math>
        w ruchu jednostajnym obrotowym jest wielkością stałą, można je wyłączyć przed znak całkowania. Otrzymamy wówczas, po obu stronach znaku równości, dwie całki oznaczone:</para>
      <equation id="ked-1bko1tr7i_uho">
        <m:math>
          <m:mrow>
            <m:mi>ε</m:mi>
            <m:mstyle displaystyle="true">
              <m:mrow>
                <m:munderover>
                  <m:mo>∫</m:mo>
                  <m:mrow>
                    <m:msub>
                      <m:mi>t</m:mi>
                      <m:mn>0</m:mn>
                    </m:msub>
                  </m:mrow>
                  <m:mi>t</m:mi>
                </m:munderover>
                <m:mrow>
                  <m:mi>d</m:mi>
                  <m:msup>
                    <m:mi>t</m:mi>
                    <m:mo>′</m:mo>
                  </m:msup>
                </m:mrow>
              </m:mrow>
            </m:mstyle>
            <m:mo>=</m:mo>
            <m:mstyle displaystyle="true">
              <m:mrow>
                <m:munderover>
                  <m:mo>∫</m:mo>
                  <m:mrow>
                    <m:msub>
                      <m:mi>ω</m:mi>
                      <m:mn>0</m:mn>
                    </m:msub>
                  </m:mrow>
                  <m:mrow>
                    <m:msub>
                      <m:mi>ω</m:mi>
                      <m:mtext>k</m:mtext>
                    </m:msub>
                  </m:mrow>
                </m:munderover>
                <m:mrow>
                  <m:mi>d</m:mi>
                  <m:mi>ω</m:mi>
                </m:mrow>
              </m:mrow>
            </m:mstyle>
            <m:mo>.</m:mo>
          </m:mrow>
        </m:math>
      </equation>

      <para id="ked-1bko22j75_tc8">Przyjmując
        <m:math>
          <m:mrow>
            <m:msub>
              <m:mi>t</m:mi>
              <m:mn>0</m:mn>
            </m:msub>
            <m:mo>=</m:mo>
            <m:mn>0</m:mn>
          </m:mrow>
        </m:math>, otrzymujemy</para>
      <equation id="ked-1bko241hn_54g">
        <m:math>
          <m:mrow>
            <m:mi>ε</m:mi>
            <m:mi>t</m:mi>
            <m:mo>=</m:mo>
            <m:msub>
              <m:mi>ω</m:mi>
              <m:mi>k</m:mi>
            </m:msub>
            <m:mo>−</m:mo>
            <m:msub>
              <m:mi>ω</m:mi>
              <m:mn>0</m:mn>
            </m:msub>
            <m:mo>.</m:mo>
          </m:mrow>
        </m:math>
      </equation>
      <para id="ked-1bko2bneu_2">Równanie to można przekształcić do postaci:</para>
      <note id="ked-1bko2cp0o_8uo">
        <equation id="ked-1bko2cs3j_828">
          <m:math>
            <m:mrow>
              <m:msub>
                <m:mi>ω</m:mi>
                <m:mtext>k</m:mtext>
              </m:msub>
              <m:mo>=</m:mo>
              <m:msub>
                <m:mi>ω</m:mi>
                <m:mn>0</m:mn>
              </m:msub>
              <m:mo>+</m:mo>
              <m:mi>ε</m:mi>
              <m:mi>t</m:mi>
              <m:mo>,</m:mo>
            </m:mrow>
          </m:math>
        </equation>
      </note>
      <para id="ked-1bko2dghm_vso">gdzie
        <m:math>
          <m:mrow>
            <m:msub>
              <m:mi>ω</m:mi>
              <m:mn>0</m:mn>
            </m:msub>
          </m:mrow>
        </m:math>
        jest początkową prędkością kątową. Powyższe równanie dla prędkości kątowej jest odpowiednikiem równania
        <m:math>
          <m:mrow>
            <m:msub>
              <m:mi>v</m:mi>
              <m:mtext>k</m:mtext>
            </m:msub>
            <m:mo>=</m:mo>
            <m:msub>
              <m:mi>v</m:mi>
              <m:mn>0</m:mn>
            </m:msub>
            <m:mo>+</m:mo>
            <m:mi>a</m:mi>
            <m:mi>t</m:mi>
          </m:mrow>
        </m:math>
        dla ruchu postępowego. Z równania tego oraz mając dane: początkową prędkość kątową i przyspieszenie kątowe, możemy wyznaczyć prędkość kątową obiektu w danej chwili
        <emphasis effect="italics">t</emphasis>.</para>
      <para id="ked-1bko34vre_boo">Postąpmy teraz podobnie z równaniem
        <m:math>
          <m:mrow>
            <m:mi>ω</m:mi>
            <m:mo>=</m:mo>
            <m:mfrac>
              <m:mrow>
                <m:mi>d</m:mi>
                <m:mi>θ</m:mi>
              </m:mrow>
              <m:mrow>
                <m:mi>d</m:mi>
                <m:mi>t</m:mi>
              </m:mrow>
            </m:mfrac>
          </m:mrow>
        </m:math>. Przekształcamy je do postaci
        <m:math>
          <m:mrow>
            <m:mi>ω</m:mi>
            <m:mi>d</m:mi>
            <m:mi>t</m:mi>
            <m:mo>=</m:mo>
            <m:mi>d</m:mi>
            <m:mi>θ</m:mi>
          </m:mrow>
        </m:math>, a następnie całkujemy obustronnie od wartości początkowych do końcowych. Tym razem musimy uwzględnić fakt, że prędkość kątowa, w ogólności, jest zależna od czasu. Otrzymamy wówczas:</para>
      <equation id="ked-1bko2ka36_cfg">
        <m:math>
          <m:mtable>
            <m:mtr>
              <m:mtd columnalign="left">
                <m:mstyle displaystyle="true">
                  <m:mrow>
                    <m:munderover>
                      <m:mo>∫</m:mo>
                      <m:mrow>
                        <m:msub>
                          <m:mi>t</m:mi>
                          <m:mn>0</m:mn>
                        </m:msub>
                      </m:mrow>
                      <m:mrow>
                        <m:msub>
                          <m:mi>t</m:mi>
                          <m:mi>k</m:mi>
                        </m:msub>
                      </m:mrow>
                    </m:munderover>
                    <m:mrow>
                      <m:mo stretchy="false">(</m:mo>
                      <m:msub>
                        <m:mi>ω</m:mi>
                        <m:mn>0</m:mn>
                      </m:msub>
                      <m:mo>+</m:mo>
                      <m:mi>ε</m:mi>
                      <m:msup>
                        <m:mi>t</m:mi>
                        <m:mo>′</m:mo>
                      </m:msup>
                      <m:mo stretchy="false">)</m:mo>
                      <m:mi>d</m:mi>
                      <m:msup>
                        <m:mi>t</m:mi>
                        <m:mo>′</m:mo>
                      </m:msup>
                      <m:mo>=</m:mo>
                      <m:mstyle displaystyle="true">
                        <m:mrow>
                          <m:munderover>
                            <m:mo>∫</m:mo>
                            <m:mrow>
                              <m:msub>
                                <m:mi>θ</m:mi>
                                <m:mn>0</m:mn>
                              </m:msub>
                            </m:mrow>
                            <m:mrow>
                              <m:msub>
                                <m:mi>θ</m:mi>
                                <m:mtext>k</m:mtext>
                              </m:msub>
                            </m:mrow>
                          </m:munderover>
                          <m:mrow>
                            <m:mi>d</m:mi>
                            <m:mi>θ</m:mi>
                          </m:mrow>
                        </m:mrow>
                      </m:mstyle>
                      <m:mo>;</m:mo>
                    </m:mrow>
                  </m:mrow>
                </m:mstyle>
              </m:mtd>
            </m:mtr>
            <m:mtr>
              <m:mtd columnalign="left">
                <m:mstyle displaystyle="true">
                  <m:mrow>
                    <m:munderover>
                      <m:mo>∫</m:mo>
                      <m:mrow>
                        <m:msub>
                          <m:mi>t</m:mi>
                          <m:mn>0</m:mn>
                        </m:msub>
                      </m:mrow>
                      <m:mrow>
                        <m:msub>
                          <m:mi>t</m:mi>
                          <m:mi>k</m:mi>
                        </m:msub>
                      </m:mrow>
                    </m:munderover>
                    <m:mrow>
                      <m:msub>
                        <m:mi>ω</m:mi>
                        <m:mn>0</m:mn>
                      </m:msub>
                      <m:mi>d</m:mi>
                      <m:mi>t</m:mi>
                      <m:mo>+</m:mo>
                      <m:mstyle displaystyle="true">
                        <m:mrow>
                          <m:munderover>
                            <m:mo>∫</m:mo>
                            <m:mrow>
                              <m:msub>
                                <m:mi>t</m:mi>
                                <m:mn>0</m:mn>
                              </m:msub>
                            </m:mrow>
                            <m:mrow>
                              <m:msub>
                                <m:mi>t</m:mi>
                                <m:mn>k</m:mn>
                              </m:msub>
                            </m:mrow>
                          </m:munderover>
                          <m:mrow>
                            <m:mi>ε</m:mi>
                            <m:mi>t</m:mi>
                            <m:mi>d</m:mi>
                            <m:mi>t</m:mi>
                            <m:mo>=</m:mo>
                          </m:mrow>
                        </m:mrow>
                      </m:mstyle>
                      <m:mstyle displaystyle="true">
                        <m:mrow>
                          <m:munderover>
                            <m:mo>∫</m:mo>
                            <m:mrow>
                              <m:msub>
                                <m:mi>θ</m:mi>
                                <m:mn>0</m:mn>
                              </m:msub>
                            </m:mrow>
                            <m:mrow>
                              <m:msub>
                                <m:mi>θ</m:mi>
                                <m:mtext>k</m:mtext>
                              </m:msub>
                            </m:mrow>
                          </m:munderover>
                          <m:mrow>
                            <m:mi>d</m:mi>
                            <m:mi>θ</m:mi>
                          </m:mrow>
                        </m:mrow>
                      </m:mstyle>
                      <m:mo>=</m:mo>
                      <m:msubsup>
                        <m:mrow>
                          <m:mrow>
                            <m:mo>[</m:mo>
                            <m:mrow>
                              <m:msub>
                                <m:mi>ω</m:mi>
                                <m:mn>0</m:mn>
                              </m:msub>
                              <m:msup>
                                <m:mi>t</m:mi>
                                <m:mo>′</m:mo>
                              </m:msup>
                              <m:mo>+</m:mo>
                              <m:mi>ε</m:mi>
                              <m:mrow>
                                <m:mo>(</m:mo>
                                <m:mrow>
                                  <m:mfrac>
                                    <m:mrow>
                                      <m:msup>
                                        <m:mrow>
                                          <m:mo stretchy="false">(</m:mo>
                                          <m:msup>
                                            <m:mi>t</m:mi>
                                            <m:mo>′</m:mo>
                                          </m:msup>
                                          <m:mo stretchy="false">)</m:mo>
                                        </m:mrow>
                                        <m:mn>2</m:mn>
                                      </m:msup>
                                    </m:mrow>
                                    <m:mn>2</m:mn>
                                  </m:mfrac>
                                </m:mrow>
                                <m:mo>)</m:mo>
                              </m:mrow>
                            </m:mrow>
                            <m:mo>]</m:mo>
                          </m:mrow>
                        </m:mrow>
                        <m:mrow>
                          <m:msub>
                            <m:mi>t</m:mi>
                            <m:mn>0</m:mn>
                          </m:msub>
                        </m:mrow>
                        <m:msub>
                          <m:mi>θ</m:mi>
                          <m:mtext>k</m:mtext>
                        </m:msub>
                      </m:msubsup>
                      <m:mo>=</m:mo>
                      <m:msub>
                        <m:mi>ω</m:mi>
                        <m:mn>0</m:mn>
                      </m:msub>
                      <m:mi>t</m:mi>
                      <m:mo>+</m:mo>
                      <m:mi>ε</m:mi>
                      <m:mrow>
                        <m:mo>(</m:mo>
                        <m:mrow>
                          <m:mfrac>
                            <m:mrow>
                              <m:msup>
                                <m:mi>t</m:mi>
                                <m:mn>2</m:mn>
                              </m:msup>
                            </m:mrow>
                            <m:mn>2</m:mn>
                          </m:mfrac>
                        </m:mrow>
                        <m:mo>)</m:mo>
                      </m:mrow>
                      <m:mo>=</m:mo>
                      <m:msub>
                        <m:mi>θ</m:mi>
                        <m:mtext>k</m:mtext>
                      </m:msub>
                      <m:mo>−</m:mo>
                      <m:msub>
                        <m:mi>θ</m:mi>
                        <m:mn>0</m:mn>
                      </m:msub>
                      <m:mo>,</m:mo>
                    </m:mrow>
                  </m:mrow>
                </m:mstyle>
              </m:mtd>
            </m:mtr>
          </m:mtable>
        </m:math>
      </equation>
      <para id="ked-1bko2m3s1_5s8">gdzie przyjęliśmy
        <m:math>
          <m:mrow>
            <m:msub>
              <m:mi>t</m:mi>
              <m:mn>0</m:mn>
            </m:msub>
            <m:mo>=</m:mo>
            <m:mn>0</m:mn>
          </m:mrow>
        </m:math>. Po przekształceniu otrzymujemy</para>
      <note id="ked-1bko2n1qi_05o">
        <equation id="ked-1bko2n7vm_e3o">
          <m:math>
            <m:mrow>
              <m:msub>
                <m:mi>θ</m:mi>
                <m:mtext>k</m:mtext>
              </m:msub>
              <m:mo>=</m:mo>
              <m:msub>
                <m:mi>θ</m:mi>
                <m:mn>0</m:mn>
              </m:msub>
              <m:mo>+</m:mo>
              <m:msub>
                <m:mi>ω</m:mi>
                <m:mn>0</m:mn>
              </m:msub>
              <m:mi>t</m:mi>
              <m:mo>+</m:mo>
              <m:mfrac>
                <m:mn>1</m:mn>
                <m:mn>2</m:mn>
              </m:mfrac>
              <m:mi>ε</m:mi>
              <m:msup>
                <m:mi>t</m:mi>
                <m:mn>2</m:mn>
              </m:msup>
              <m:mo>.</m:mo>
            </m:mrow>
          </m:math>
        </equation>
      </note>
      <para id="ked-1bko2oij3_q4">Równanie to jest odpowiednikiem równania kinetycznego dla ruchu jednostajnego, prostoliniowego, określającego zależność położenia od czasu. Równanie to było analizowane w rozdziale
        <link document="m58281">RUCH WZDŁUŻ LINII PROSTEJ</link>. Z równania tego można otrzymać wartość drogi kątowej (przemieszczenia kątowego) obracającego się ciała sztywnego w dowolnym czasie <emphasis effect="italics">t</emphasis>, jeżeli są dane warunki początkowe (początkowe położenie
        kątowe i początkowa prędkość kątowa) oraz przyspieszenie kątowe.</para>
      <para id="ked-1bko34vra_r9o">Możemy również napisać równanie na końcowe położenie kątowe (drogę kątową), w którym nie będzie występował, w sposób jawny, czas. W tym celu z równania na prędkość kątową
        <link target-id="ked-1bko2cs3j_828"/>
        wyznaczamy czas i otrzymane wyrażenie wstawiamy do powyższego równania
        <link target-id="ked-1bko2n7vm_e3o"/>. Wówczas równanie na
        <m:math>
          <m:mrow>
            <m:msub>
              <m:mi>θ</m:mi>
              <m:mtext>k</m:mtext>
            </m:msub>
          </m:mrow>
        </m:math>
        <link target-id="ked-1bko2n7vm_e3o"/>
        będzie miało postać:
      </para>
      <equation id="ked-1bko4ief9_vno">
        <m:math>
          <m:mtable>
            <m:mtr>
              <m:mtd columnalign="right">
                <m:msub>
                  <m:mi>θ</m:mi>
                  <m:mtext>k</m:mtext>
                </m:msub>
              </m:mtd>
              <m:mtd columnalign="left">
                <m:mo>=</m:mo>
              </m:mtd>
              <m:mtd columnalign="left">
                <m:msub>
                  <m:mi>θ</m:mi>
                  <m:mn>0</m:mn>
                </m:msub>
                <m:mo>+</m:mo>
                <m:msub>
                  <m:mi>ω</m:mi>
                  <m:mn>0</m:mn>
                </m:msub>
                <m:mrow>
                  <m:mo>(</m:mo>
                  <m:mrow>
                    <m:mfrac>
                      <m:mrow>
                        <m:msub>
                          <m:mi>ω</m:mi>
                          <m:mtext>k</m:mtext>
                        </m:msub>
                        <m:mo>−</m:mo>
                        <m:msub>
                          <m:mi>ω</m:mi>
                          <m:mn>0</m:mn>
                        </m:msub>
                      </m:mrow>
                      <m:mi>ε</m:mi>
                    </m:mfrac>
                  </m:mrow>
                  <m:mo>)</m:mo>
                </m:mrow>
                <m:mo>+</m:mo>
                <m:mfrac>
                  <m:mn>1</m:mn>
                  <m:mn>2</m:mn>
                </m:mfrac>
                <m:mi>ε</m:mi>
                <m:msup>
                  <m:mrow>
                    <m:mo>(</m:mo>
                    <m:mrow>
                      <m:mfrac>
                        <m:mrow>
                          <m:msub>
                            <m:mi>ω</m:mi>
                            <m:mtext>k</m:mtext>
                          </m:msub>
                          <m:mo>−</m:mo>
                          <m:msub>
                            <m:mi>ω</m:mi>
                            <m:mn>0</m:mn>
                          </m:msub>
                        </m:mrow>
                        <m:mi>ε</m:mi>
                      </m:mfrac>
                    </m:mrow>
                    <m:mo>)</m:mo>
                  </m:mrow>
                  <m:mn>2</m:mn>
                </m:msup>
              </m:mtd>
            </m:mtr>
            <m:mtr>
              <m:mtd/>
              <m:mtd columnalign="left">
                <m:mo>=</m:mo>
              </m:mtd>
              <m:mtd columnalign="left">
                <m:msub>
                  <m:mi>θ</m:mi>
                  <m:mn>0</m:mn>
                </m:msub>
                <m:mo>+</m:mo>
                <m:mfrac>
                  <m:mrow>
                    <m:msub>
                      <m:mi>ω</m:mi>
                      <m:mn>0</m:mn>
                    </m:msub>
                    <m:msub>
                      <m:mi>ω</m:mi>
                      <m:mtext>k</m:mtext>
                    </m:msub>
                  </m:mrow>
                  <m:mi>ε</m:mi>
                </m:mfrac>
                <m:mo>−</m:mo>
                <m:mfrac>
                  <m:mrow>
                    <m:msubsup>
                      <m:mi>ω</m:mi>
                      <m:mn>0</m:mn>
                      <m:mn>2</m:mn>
                    </m:msubsup>
                  </m:mrow>
                  <m:mi>ε</m:mi>
                </m:mfrac>
                <m:mo>+</m:mo>
                <m:mfrac>
                  <m:mn>1</m:mn>
                  <m:mn>2</m:mn>
                </m:mfrac>
                <m:mspace width="0.2em"/>
                <m:mfrac>
                  <m:mrow>
                    <m:msubsup>
                      <m:mi>ω</m:mi>
                      <m:mtext>k</m:mtext>
                      <m:mn>2</m:mn>
                    </m:msubsup>
                  </m:mrow>
                  <m:mi>ε</m:mi>
                </m:mfrac>
                <m:mo>−</m:mo>
                <m:mfrac>
                  <m:mrow>
                    <m:msub>
                      <m:mi>ω</m:mi>
                      <m:mn>0</m:mn>
                    </m:msub>
                    <m:msub>
                      <m:mi>ω</m:mi>
                      <m:mtext>k</m:mtext>
                    </m:msub>
                  </m:mrow>
                  <m:mi>ε</m:mi>
                </m:mfrac>
                <m:mo>+</m:mo>
                <m:mfrac>
                  <m:mn>1</m:mn>
                  <m:mn>2</m:mn>
                </m:mfrac>
                <m:mspace width="0.2em"/>
                <m:mfrac>
                  <m:mrow>
                    <m:msubsup>
                      <m:mi>ω</m:mi>
                      <m:mn>0</m:mn>
                      <m:mn>2</m:mn>
                    </m:msubsup>
                  </m:mrow>
                  <m:mi>ε</m:mi>
                </m:mfrac>
              </m:mtd>
            </m:mtr>
            <m:mtr>
              <m:mtd/>
              <m:mtd columnalign="left">
                <m:mo>=</m:mo>
              </m:mtd>
              <m:mtd columnalign="left">
                <m:msub>
                  <m:mi>θ</m:mi>
                  <m:mn>0</m:mn>
                </m:msub>
                <m:mo>+</m:mo>
                <m:mfrac>
                  <m:mn>1</m:mn>
                  <m:mn>2</m:mn>
                </m:mfrac>
                <m:mspace width="0.2em"/>
                <m:mfrac>
                  <m:mrow>
                    <m:msubsup>
                      <m:mi>ω</m:mi>
                      <m:mtext>k</m:mtext>
                      <m:mn>2</m:mn>
                    </m:msubsup>
                  </m:mrow>
                  <m:mi>ε</m:mi>
                </m:mfrac>
                <m:mo>−</m:mo>
                <m:mfrac>
                  <m:mn>1</m:mn>
                  <m:mn>2</m:mn>
                </m:mfrac>
                <m:mspace width="0.2em"/>
                <m:mfrac>
                  <m:mrow>
                    <m:msubsup>
                      <m:mi>ω</m:mi>
                      <m:mn>0</m:mn>
                      <m:mn>2</m:mn>
                    </m:msubsup>
                  </m:mrow>
                  <m:mi>ε</m:mi>
                </m:mfrac>
                <m:mo>,</m:mo>
              </m:mtd>
            </m:mtr>
            <m:mtr>
              <m:mtd columnalign="left">
                <m:msub>
                  <m:mi>θ</m:mi>
                  <m:mtext>k</m:mtext>
                </m:msub>
                <m:mo>−</m:mo>
                <m:msub>
                  <m:mi>θ</m:mi>
                  <m:mn>0</m:mn>
                </m:msub>
              </m:mtd>
              <m:mtd columnalign="left">
                <m:mo>=</m:mo>
              </m:mtd>
              <m:mtd columnalign="left">
                <m:mfrac>
                  <m:mrow>
                    <m:msubsup>
                      <m:mi>ω</m:mi>
                      <m:mtext>k</m:mtext>
                      <m:mn>2</m:mn>
                    </m:msubsup>
                    <m:mo>−</m:mo>
                    <m:msubsup>
                      <m:mi>ω</m:mi>
                      <m:mn>0</m:mn>
                      <m:mn>2</m:mn>
                    </m:msubsup>
                  </m:mrow>
                  <m:mrow>
                    <m:mn>2</m:mn>
                    <m:mi>ε</m:mi>
                  </m:mrow>
                </m:mfrac>
              </m:mtd>
            </m:mtr>
          </m:mtable>
        </m:math>
      </equation>
      <para id="ked-1bko4j2f0_6f">lub</para>
      <note id="ked-1bko4k8ui_an">
        <equation id="ked-1bko4kh34_n8o">
          <m:math>
            <m:mrow>
              <m:msubsup>
                <m:mi>ω</m:mi>
                <m:mtext>k</m:mtext>
                <m:mn>2</m:mn>
              </m:msubsup>
              <m:mo>=</m:mo>
              <m:msubsup>
                <m:mi>ω</m:mi>
                <m:mn>0</m:mn>
                <m:mn>2</m:mn>
              </m:msubsup>
              <m:mo>+</m:mo>
              <m:mn>2</m:mn>
              <m:mi>ε</m:mi>
              <m:mo stretchy="false">(</m:mo>
              <m:mtext>Δ</m:mtext>
              <m:mi>θ</m:mi>
              <m:mo stretchy="false">)</m:mo>
              <m:mo>.</m:mo>
            </m:mrow>
          </m:math>
        </equation>
      </note>
      <para id="ked-1bko4lmgp_keg">Równania od równania
        <link target-id="ked-1bko1khv2_ffg"/>
        do równania
        <link target-id="ked-1bko4kh34_n8o"/>
        opisują obroty wokół stałej osi ze stałym przyspieszeniem kątowym. Zostały one zebrane w
        <link target-id="fs-id1167134435354"/>.</para>
      <table
        id="fs-id1167134435354"
        summary="A two column, four row table is shown. The first column contains “Angular displacement from average angular velocity,” “Angular velocity from angular acceleration,” Angular displacement from angular velocity and angular acceleration,” and “Angular velocity from angular displacement and angular acceleration.” The second column contains “theta subscript f equals theta subscript zero plus omega with a line over it times t,” “omega subscript f equals omega subscript zero plus alpha times t,” “theta subscript f equals theta subscript 0 plus omega subscript 0 times t plus one half alpha times t squared,” and “omega subscript f superscript 2 equals omega subscript zero superscript 2 plus 2 alpha times delta theta.”">
        <tgroup cols="2">
          <colspec colnum="1" colname="col1"/>
          <colspec colnum="2" colname="col2"/>
          <tbody>
            <row valign="top">
              <entry valign="top" align="left">Zależność drogi kątowej (położenia kątowego) od średniej prędkości kątowej</entry>
              <entry valign="top" align="left">
                <m:math>
                  <m:mrow>
                    <m:msub>
                      <m:mi>θ</m:mi>
                      <m:mtext>k</m:mtext>
                    </m:msub>
                    <m:mo>=</m:mo>
                    <m:msub>
                      <m:mi>θ</m:mi>
                      <m:mn>0</m:mn>
                    </m:msub>
                    <m:mo>+</m:mo>
                    <m:mover accent="true">
                      <m:mi>ω</m:mi>
                      <m:mo>–</m:mo>
                    </m:mover>
                    <m:mi>t</m:mi>
                  </m:mrow>
                </m:math>
              </entry>
            </row>
            <row valign="top">
              <entry valign="top" align="left">Zależność prędkości kątowej od stałego przyspieszenia kątowego</entry>
              <entry valign="top" align="left">
                <m:math>
                  <m:mrow>
                    <m:msub>
                      <m:mi>ω</m:mi>
                      <m:mtext>k</m:mtext>
                    </m:msub>
                    <m:mo>=</m:mo>
                    <m:msub>
                      <m:mi>ω</m:mi>
                      <m:mn>0</m:mn>
                    </m:msub>
                    <m:mo>+</m:mo>
                    <m:mi>ε</m:mi>
                    <m:mi>t</m:mi>
                  </m:mrow>
                </m:math>
              </entry>
            </row>
            <row valign="top">
              <entry valign="top" align="left">Zależność drogi kątowej (położenia kątowego) od początkowej prędkości kątowej i przyspieszenia kątowego</entry>
              <entry valign="top" align="left">
                <m:math>
                  <m:mrow>
                    <m:msub>
                      <m:mi>θ</m:mi>
                      <m:mtext>k</m:mtext>
                    </m:msub>
                    <m:mo>=</m:mo>
                    <m:msub>
                      <m:mi>θ</m:mi>
                      <m:mn>0</m:mn>
                    </m:msub>
                    <m:mo>+</m:mo>
                    <m:msub>
                      <m:mi>ω</m:mi>
                      <m:mn>0</m:mn>
                    </m:msub>
                    <m:mi>t</m:mi>
                    <m:mo>+</m:mo>
                    <m:mfrac>
                      <m:mn>1</m:mn>
                      <m:mn>2</m:mn>
                    </m:mfrac>
                    <m:mi>ε</m:mi>
                    <m:msup>
                      <m:mi>t</m:mi>
                      <m:mn>2</m:mn>
                    </m:msup>
                  </m:mrow>
                </m:math>
              </entry>
            </row>
            <row valign="top">
              <entry valign="top" align="left">Związek prędkości kątowej z drogą kątową i przyspieszeniem kątowym</entry>
              <entry valign="top" align="left">
                <m:math>
                  <m:mrow>
                    <m:msubsup>
                      <m:mi>ω</m:mi>
                      <m:mtext>k</m:mtext>
                      <m:mn>2</m:mn>
                    </m:msubsup>
                    <m:mo>=</m:mo>
                    <m:msub>
                      <m:mi>ω</m:mi>
                      <m:mn>0</m:mn>
                    </m:msub>
                    <m:msup><m:mrow/>
                      <m:mn>2</m:mn>
                    </m:msup>
                    <m:mo>+</m:mo>
                    <m:mn>2</m:mn>
                    <m:mi>ε</m:mi>
                    <m:mo stretchy="false">(</m:mo>
                    <m:mtext>Δ</m:mtext>
                    <m:mi>θ</m:mi>
                    <m:mo stretchy="false">)</m:mo>
                  </m:mrow>
                </m:math>
              </entry>
            </row>
          </tbody>
        </tgroup>
      </table>
    </section>

    <section id="ked-1bko7ejnl_gh8">
      <title>Zastosowanie równań opisujących kinematykę ruchu obrotowego</title>
      <para id="ked-1bko7g9fs_oeo">Teraz, na kilku prostych przykładach zobaczmy w jaki sposób można, w codziennych sytuacjach, zastosować podstawowe relacje kinematyczne do analizy ruchu obrotowego.</para>
      <example id="ked-1bko7gl6v_jhg">
        <para id="ked-1bko7g9fs_xea">
          Obliczenie przyspieszenia kołowrotka wędkarskiego Rybak złapał na wędkę dużą rybę, która odpływając od łodzi ciągnie za sobą żyłkę z kołowrotka wędki. Początkowo kołowrotek nie obracał się (był w spoczynku). Żyłka rozwija się z kołowrotka o promieniu
          4,50 cm (<link target-id="CNX_UPhysics_10_02_Reel"/>). Kołowrotek obraca się z przyspieszeniem kątowym
          <m:math>
            <m:mrow>
              <m:mn>110</m:mn>
              <m:msup>
                <m:mrow>
                  <m:mspace width="0.2em"/>
                  <m:mtext>rad/s</m:mtext>
                </m:mrow>
                <m:mn>2</m:mn>
              </m:msup>
            </m:mrow>
          </m:math>
          przez 2,00 s
        </para>
        <para id="ked-1bko7mi63_3kg">(a) Jaka jest końcowa prędkość kątowa kołowrotka po 2 s?</para>
        <para id="ked-1bko7ml1o_uh">(b) Ile obrotów w tym czasie zrobił kołowrotek?</para>
        <figure id="CNX_UPhysics_10_02_Reel">
          <media id="ked-1bko7impf_ui" alt="Figure is a drawing of a fishing line coming off a rotating reel. Rotation radius is 4.5 cm, rotation takes place in the counterclockwise direction.">
            <image src="CNX_UPhysics_10_02_Reel.jpg" mime-type="image/jpeg"/>
          </media>
        </figure>
        <para id="ked-1bko7nc9m_c88">
          <title>Strategia rozwiązania</title>
          Zidentyfikuj dane i porównaj z równaniami kinematycznymi dla przypadku stałego przyspieszania. Poszukaj odpowiedniego równania, które można zastosować do wyznaczenia niewiadomych, korzystając z danych podanych w opisie problemu.
        </para>
        <list id="ked-1bko7ocv3_5v8">
          <title>Rozwiązanie</title>
          <item>Znając
            <m:math>
              <m:mi>ε</m:mi>
            </m:math>
            i
            <emphasis effect="italics">t</emphasis>
            mamy wyznaczyć
            <m:math>
              <m:mi>ω</m:mi>
            </m:math>. Najprostszym równaniem, które możemy tu zastosować, jest równanie
            <m:math>
              <m:mrow>
                <m:msub>
                  <m:mi>ω</m:mi>
                  <m:mtext>k</m:mtext>
                </m:msub>
                <m:mo>=</m:mo>
                <m:msub>
                  <m:mi>ω</m:mi>
                  <m:mn>0</m:mn>
                </m:msub>
                <m:mo>+</m:mo>
                <m:mi>ε</m:mi>
                <m:mi>t</m:mi>
              </m:mrow>
            </m:math>
            , ponieważ występują tu wszystkie dane podane w zadaniu oraz tylko jedna niewiadoma, której wartość mamy wyznaczyć. Załóżmy, że
            <m:math>
              <m:mrow>
                <m:msub>
                  <m:mi>ω</m:mi>
                  <m:mn>0</m:mn>
                </m:msub>
                <m:mo>=</m:mo>
                <m:mn>0</m:mn>
              </m:mrow>
            </m:math>
            (początkowo kołowrotek nie obracał się), więc<equation id="ked-1bko7rik8_nko">
              <m:math>
                <m:mrow>
                  <m:msub>
                    <m:mi>ω</m:mi>
                    <m:mtext>k</m:mtext>
                  </m:msub>
                  <m:mo>=</m:mo>
                  <m:mn>0</m:mn>
                  <m:mo>+</m:mo>
                  <m:mo stretchy="false">(</m:mo>
                  <m:mn>110</m:mn>
                  <m:msup>
                    <m:mrow>
                      <m:mspace width="0.2em"/>
                      <m:mtext>rad/s</m:mtext>
                    </m:mrow>
                    <m:mn>2</m:mn>
                  </m:msup>
                  <m:mo stretchy="false">)</m:mo>
                  <m:mo stretchy="false">(</m:mo>
                  <m:mn>2,00</m:mn>
                  <m:mspace width="0.2em"/>
                  <m:mtext>s</m:mtext>
                  <m:mo stretchy="false">)</m:mo>
                  <m:mo>=</m:mo>
                  <m:mn>220</m:mn>
                  <m:mspace width="0.2em"/>
                  <m:mtext>rad/s</m:mtext>
                  <m:mo>.</m:mo>
                </m:mrow>
              </m:math>
            </equation>
          </item>
          <item>Mamy wyznaczyć liczbę obrotów kołowrotka. Ponieważ jeden obrót oznacza obrót o kąt
            <m:math xmlns="http://www.w3.org/1998/Math/MathML">
              <m:mn>2</m:mn>
              <m:mi>π<!-- π --></m:mi>
            </m:math>
            rad, możemy znaleźć liczbę obrotów poprzez znalezienie
            <m:math>
              <m:mi>θ</m:mi>
            </m:math>
            w radianach. Znając e i t oraz wiedząc, że
            <m:math>
              <m:mrow>
                <m:msub>
                  <m:mi>ω</m:mi>
                  <m:mn>0</m:mn>
                </m:msub>
              </m:mrow>
            </m:math>
            jest równa zero, możemy wyznaczyć
            <m:math>
              <m:mi>θ</m:mi>
            </m:math>
            za pomocą równania:<equation id="ked-1bko85dff_77o">
              <m:math>
                <m:mtable>
                  <m:mtr>
                    <m:mtd columnalign="right">
                      <m:msub>
                        <m:mi>θ</m:mi>
                        <m:mtext>k</m:mtext>
                      </m:msub>
                    </m:mtd>
                    <m:mtd columnalign="left">
                      <m:mo>=</m:mo>
                      <m:msub>
                        <m:mi>θ</m:mi>
                        <m:mtext>0</m:mtext>
                      </m:msub>
                      <m:mo>+</m:mo>
                      <m:msub>
                        <m:mi>ω</m:mi>
                        <m:mtext>0</m:mtext>
                      </m:msub>
                      <m:mi>t</m:mi>
                      <m:mo>+</m:mo>
                      <m:mfrac>
                        <m:mn>1</m:mn>
                        <m:mn>2</m:mn>
                      </m:mfrac>
                      <m:mi>ε</m:mi>
                      <m:msup>
                        <m:mi>t</m:mi>
                        <m:mn>2</m:mn>
                      </m:msup>
                    </m:mtd>
                  </m:mtr>
                  <m:mtr>
                    <m:mtd/>
                    <m:mtd columnalign="left">
                      <m:mo>=</m:mo>
                      <m:mn>0</m:mn>
                      <m:mo>+</m:mo>
                      <m:mn>0</m:mn>
                      <m:mo>+</m:mo>
                      <m:mrow>
                        <m:mo>(</m:mo>
                        <m:mrow>
                          <m:mn>0,500</m:mn>
                        </m:mrow>
                        <m:mo>)</m:mo>
                      </m:mrow>
                      <m:mrow>
                        <m:mo>(</m:mo>
                        <m:mrow>
                          <m:mn>110</m:mn>
                          <m:msup>
                            <m:mrow>
                              <m:mspace width="0.2em"/>
                              <m:mtext>rad/s</m:mtext>
                            </m:mrow>
                            <m:mn>2</m:mn>
                          </m:msup>
                        </m:mrow>
                        <m:mo>)</m:mo>
                      </m:mrow>
                      <m:msup>
                        <m:mrow>
                          <m:mo>(</m:mo>
                          <m:mrow>
                            <m:mn>2,00</m:mn>
                            <m:mspace width="0.2em"/>
                            <m:mtext>s</m:mtext>
                          </m:mrow>
                          <m:mo>)</m:mo>
                        </m:mrow>
                        <m:mn>2</m:mn>
                      </m:msup>
                      <m:mo>=</m:mo>
                      <m:mn>220</m:mn>
                      <m:mspace width="0.2em"/>
                      <m:mtext>rad</m:mtext>
                      <m:mtext>.</m:mtext>
                    </m:mtd>
                  </m:mtr>
                </m:mtable>
              </m:math>
            </equation>
            Zamiana radianów na obroty daje
            <equation id="ked-1bko87juh_sro">
              <m:math>
                <m:mrow>
                  <m:mtext>Liczba obrotów</m:mtext>
                  <m:mspace width="0.2em"/>
                  <m:mo>=</m:mo>
                  <m:mo stretchy="false">(</m:mo>
                  <m:mn>220</m:mn>
                  <m:mspace width="0.2em"/>
                  <m:mtext>rad</m:mtext>
                  <m:mo stretchy="false">)</m:mo>
                  <m:mfrac>
                    <m:mrow>
                      <m:mn>1</m:mn>
                      <m:mspace width="0.2em"/>
                      <m:mtext>obr</m:mtext>
                    </m:mrow>
                    <m:mrow>
                      <m:mn>2</m:mn>
                      <m:mi>π</m:mi>
                      <m:mspace width="0.2em"/>
                      <m:mtext>rad</m:mtext>
                    </m:mrow>
                  </m:mfrac>
                  <m:mo>=</m:mo>
                  <m:mn>35,0</m:mn>
                  <m:mspace width="0.2em"/>
                  <m:mtext>obr</m:mtext>
                  <m:mtext>.</m:mtext>
                </m:mrow>
              </m:math>
            </equation>
          </item>
        </list>
        <para id="ked-1bko8cq9g_69g">
          <title>Uwaga</title>
          Przykład ten pokazuje, że relacje między wielkościami obrotowymi są analogiczne do relacji pomiędzy wielkościami liniowymi. Odpowiedzi uzyskane w zadaniu są realistyczne. Po odwijaniu się żyłki przez dwie sekundy kołowrotek obraca się z prędkością
          kątową 220 rad/s, czyli wykonuje 2100 obr/min. (Nic dziwnego, że bębny czasem wydają dźwięki o wysokich częstotliwościach).
        </para>
      </example>

      <para id="ked-1bko94jcu_1q">W poprzednim przykładzie rozważaliśmy kołowrotek wędkarski obracający się z dodatnim przyspieszeniem kątowym. Rozpatrzmy teraz sytuację, gdy kołowrotek obraca się z ujemnym przyspieszeniem kątowym.</para>
      <example id="ked-1bkoud6ju_95o">
        <para id="ked-1bkouf6mr_odo">Obliczmy czasu trwania obrotów, gdy kołowrotek zwalnia i zatrzymuje się. Teraz rybak stosując hamulec w kołowrotku powoduje, że obraca on się z przyspieszeniem kątowym
          <m:math>
            <m:mrow>
              <m:mn>−300</m:mn>
              <m:msup>
                <m:mrow>
                  <m:mspace width="0.2em"/>
                  <m:mtext>rad/s</m:mtext>
                </m:mrow>
                <m:mn>2</m:mn>
              </m:msup>
            </m:mrow>
          </m:math>. Po jakim czasie kołowrotek się zatrzyma?</para>
        <para id="ked-1bkouh1vl_hq8">
          <title>Strategia rozwiązania</title>
          W tym przykładzie mamy wyznaczyć czas
          <emphasis effect="italics">t</emphasis>, po jakim kołowrotek przestanie się obracać. Obecnie warunki początkowe i końcowe różnią się od tych z poprzedniego przykładu ale dotyczącą tego samego kołowrotka. Teraz początkowa prędkość kątowa jest
          <m:math>
            <m:mrow>
              <m:msub>
                <m:mi>ω</m:mi>
                <m:mn>0</m:mn>
              </m:msub>
              <m:mo>=</m:mo>
              <m:mn>220</m:mn>
              <m:mspace width="0.2em"/>
              <m:mrow>
                <m:mrow>
                  <m:mtext>rad</m:mtext>
                </m:mrow>
                <m:mtext>/</m:mtext>
                <m:mtext>s</m:mtext>
              </m:mrow>
            </m:mrow>
          </m:math>, końcowa prędkość kątowa
          <m:math>
            <m:mrow>
              <m:mi>ω</m:mi>
            </m:mrow>
          </m:math>
          jest równa zero, a przyspieszenie kątowe
          <m:math>
            <m:mi>ϵ<!-- ϵ --></m:mi>
            <m:mo>=</m:mo>
            <m:mo>−<!-- − --></m:mo>
            <m:mn>300</m:mn>
            <m:mspace width="0.2em"/>
            <m:msup>
              <m:mtext>rad/s</m:mtext>
              <m:mn>2</m:mn>
            </m:msup>
            <m:mo>.</m:mo>
          </m:math>Spośród dostępnych równań, równaniem w którym występują wszystkie dane podane w przykładzie i szukany czas
          <emphasis effect="italics">t</emphasis>, jest równanie
          <m:math>
            <m:mrow>
              <m:msub>
                <m:mi>ω</m:mi>
                <m:mtext>k</m:mtext>
              </m:msub>
              <m:mo>=</m:mo>
              <m:msub>
                <m:mi>ω</m:mi>
                <m:mn>0</m:mn>
              </m:msub>
              <m:mo>+</m:mo>
              <m:mi>ε</m:mi>
              <m:mi>t</m:mi>
              <m:mo>.</m:mo>
            </m:mrow>
          </m:math>Możemy je użyć do wyliczenia
          <emphasis effect="italics">t</emphasis>.</para>
        <para id="ked-1bkouh79o_3eo">
          <title>Rozwiązanie</title>
          Zastosujmy równanie
        </para>
        <equation id="ked-1bkouspga_u7">
          <m:math>
            <m:mrow>
              <m:msub>
                <m:mi>ω</m:mi>
                <m:mtext>k</m:mtext>
              </m:msub>
              <m:mo>=</m:mo>
              <m:msub>
                <m:mi>ω</m:mi>
                <m:mn>0</m:mn>
              </m:msub>
              <m:mo>+</m:mo>
              <m:mi>ε</m:mi>
              <m:mi>t</m:mi>
              <m:mo>.</m:mo>
            </m:mrow>
          </m:math>
        </equation>
        <para id="ked-1bkovhr8e_2pg">Wyznaczając z tego równania
          <emphasis effect="italics">t</emphasis>, a następnie wstawiając dane otrzymamy:</para>
        <equation id="ked-1bkoutt21_mf">
          <m:math>
            <m:mrow>
              <m:mi>t</m:mi>
              <m:mo>=</m:mo>
              <m:mfrac>
                <m:mrow>
                  <m:msub>
                    <m:mi>ω</m:mi>
                    <m:mtext>k</m:mtext>
                  </m:msub>
                  <m:mo>−</m:mo>
                  <m:msub>
                    <m:mi>ω</m:mi>
                    <m:mn>0</m:mn>
                  </m:msub>
                </m:mrow>
                <m:mi>ε</m:mi>
              </m:mfrac>
              <m:mo>=</m:mo>
              <m:mfrac>
                <m:mrow>
                  <m:mn>0</m:mn>
                  <m:mo>−</m:mo>
                  <m:mn>220,0</m:mn>
                  <m:mspace width="0.2em"/>
                  <m:mtext>rad/s</m:mtext>
                </m:mrow>
                <m:mrow>
                  <m:mn>−300.0</m:mn>
                  <m:mspace width="0.2em"/>
                  <m:msup>
                    <m:mrow>
                      <m:mtext>rad/s</m:mtext>
                    </m:mrow>
                    <m:mn>2</m:mn>
                  </m:msup>
                </m:mrow>
              </m:mfrac>
              <m:mo>=</m:mo>
              <m:mn>0,733</m:mn>
              <m:mspace width="0.2em"/>
              <m:mtext>s</m:mtext>
              <m:mo>.</m:mo>
            </m:mrow>
          </m:math>
        </equation>
        <para id="ked-1bkouv4lc_q3g">
          <title>Uwaga</title>
          Należy zachować ostrożność przy przypisywaniu znaku wartościom wielkości wektorowych, wskazując w ten sposób na kierunek tych wielkości. Zauważmy, że czas potrzebny do zatrzymania kołowrotka jest dość mały, ponieważ opóźnienie jest dość duże. Żyłki
          wędkarskie czasami ulegają zerwaniu w wyniku dużego przyspieszenia, a rybacy często pozwalają rybie płynąć przez chwilę przed użyciem hamulca na bębnie. Zmęczona ryba płynie wolniej, więc można zastosować mniejsze przyspieszenie (opóźnienie).</para>
      </example>
      <note id="ked-1bkov1tju_m6o">
        <exercise id="ked-1bkov20nn_smo">
          <problem id="ked-1bkovav1b_t8o">
            <para id="ked-1bkovcasq_hk">
              <emphasis effect="bold">Sprawdź, czy rozumiesz.</emphasis>
              Wirówka stosowana do ekstrakcji DNA wiruje z maksymalną prędkością 7000 obr/min, wytwarzając siłę odśrodkową działającą na próbkę, która jest 6000 razy większa od siły grawitacji. Jeśli wirówce potrzeba 10 s od chwili startu do osiągnięcia
              maksymalnej prędkości wirowania: (a) Jakie jest przyspieszenie kątowe wirówki? (b) Jakie jest przemieszczenie kątowe wirówki w tym czasie?</para>
          </problem>
          <solution id="ked-1bkovb91u_8n">
            <para id="ked-1bkovb90q_7ko">!!NO SOLUTION!!</para>
          </solution>
        </exercise>
      </note>

      <example id="ked-1bkpfhem9_p3">
        <para id="ked-1bkpfi5jf_3co">
          <title>Przyspieszenie kątowe śmigła</title>
          <link target-id="CNX_UPhysics_10_02_Prop"/>
          przedstawia wykres zależności prędkości kątowej śmigła samolotu od czasu. Jego prędkość kątowa rozpoczyna się od wartości 30 rad/s i liniowo zmniejsza się do 0 rad/s w ciągu 5 sekund. (a) Wyznacz przyspieszenie kątowe śmigła. Zweryfikuj otrzymany
          wynik przy użyciu równań kinematycznych. (b) Wyznacz kąt o jaki obróci się śmigło w ciągu tych 5 sekund. Zweryfikuj wynik przy użyciu równań kinematycznych.</para>
        <figure id="CNX_UPhysics_10_02_Prop">
          <media id="ked-1bkpfk241_dlg" alt="Figure is a graph of the angular velocity in rads per second plotted versus time in seconds. Angular velocity decreases linearly with time, from 30 rads per second at zero seconds to zero at 5 seconds.">
            <image src="CNX_UPhysics_10_02_Prop.jpg" mime-type="image/jpeg"/>
          </media>
          <caption>
            Wykres zależności prędkości kątowej śmigła od czasu.
          </caption>
        </figure>
        <para id="ked-1bkpfvtn0_nfg">
          <title>Strategia rozwiązania</title>
        </para>
        <list id="ked-1bkpg0q07_s6" list-type="enumerated" number-style="lower-alpha">
          <item>Ponieważ prędkość kątowa zmienia się liniowo w czasie, wnioskujemy, że przyspieszenie kątowe jest stałe i nie zależy od czasu. Przyspieszenie kątowe jest równe nachyleniu prostej ilustrującej zależność prędkości kątowej od czasu,
            <m:math>
              <m:mrow>
                <m:mi>ε</m:mi>
                <m:mo>=</m:mo>
                <m:mfrac>
                  <m:mrow>
                    <m:mi>d</m:mi>
                    <m:mi>ω</m:mi>
                  </m:mrow>
                  <m:mrow>
                    <m:mi>d</m:mi>
                    <m:mi>t</m:mi>
                  </m:mrow>
                </m:mfrac>
              </m:mrow>
            </m:math>. Dane do obliczenia nachylenia możemy odczytać bezpośrednio z rysunku 2. Otrzymujemy
            <m:math>
              <m:mrow>
                <m:msub>
                  <m:mi>ω</m:mi>
                  <m:mn>0</m:mn>
                </m:msub>
                <m:mo>=</m:mo>
                <m:mn>30</m:mn>
                <m:mspace width="0.2em"/>
                <m:mtext>rad/s</m:mtext>
              </m:mrow>
            </m:math>
            , dla
            <m:math>
              <m:mrow>
                <m:mi>t</m:mi>
                <m:mo>=</m:mo>
                <m:mn>0</m:mn>
                <m:mspace width="0.2em"/>
                <m:mtext>s</m:mtext>
              </m:mrow>
            </m:math>
            oraz
            <m:math xmlns="http://www.w3.org/1998/Math/MathML">
              <m:msub>
                <m:mi>ω<!-- ω --></m:mi>
                <m:mtext>k</m:mtext>
              </m:msub>
              <m:mo>=</m:mo>
              <m:mn>0</m:mn>
              <m:mspace width="0.2em"/>
            </m:math>dla
            <m:math>
              <m:mrow>
                <m:mi>t</m:mi>
                <m:mo>=</m:mo>
                <m:mn>5</m:mn>
                <m:mspace width="0.2em"/>
                <m:mtext>s</m:mtext>
              </m:mrow>
            </m:math>. Następnie możemy zweryfikować wynik przy użyciu równania
            <m:math>
              <m:mrow>
                <m:mi>ω</m:mi>
                <m:mo>=</m:mo>
                <m:msub>
                  <m:mi>ω</m:mi>
                  <m:mn>0</m:mn>
                </m:msub>
                <m:mo>+</m:mo>
                <m:mi>ε</m:mi>
                <m:mi>t</m:mi>
              </m:mrow>
            </m:math>.</item>
          <item>Teraz zastosujemy równanie
            <m:math>
              <m:mrow>
                <m:mi>ω</m:mi>
                <m:mo>=</m:mo>
                <m:mfrac>
                  <m:mrow>
                    <m:mi>d</m:mi>
                    <m:mi>θ</m:mi>
                  </m:mrow>
                  <m:mrow>
                    <m:mi>d</m:mi>
                    <m:mi>t</m:mi>
                  </m:mrow>
                </m:mfrac>
                <m:mo>;</m:mo>
              </m:mrow>
            </m:math>
            ponieważ pierwsza pochodna położenia kątowego po czasie jest prędkością kątową, możemy wyznaczyć przemieszczenie kątowe całkując prędkość kątową. Zgodnie z rysunkiem oznacza to wyznaczenie pola powierzchni pod wykresem prędkości kątowej. Inaczej
            mówiąc:<equation id="ked-1bkpg62ai_26g">
              <m:math>
                <m:mrow>
                  <m:mstyle displaystyle="true">
                    <m:mrow>
                      <m:munderover>
                        <m:mo>∫</m:mo>
                        <m:mrow>
                          <m:msub>
                            <m:mi>θ</m:mi>
                            <m:mn>0</m:mn>
                          </m:msub>
                        </m:mrow>
                        <m:mrow>
                          <m:msub>
                            <m:mi>θ</m:mi>
                            <m:mtext>k</m:mtext>
                          </m:msub>
                        </m:mrow>
                      </m:munderover>
                      <m:mrow>
                        <m:mi>d</m:mi>
                        <m:mi>θ</m:mi>
                        <m:mo>=</m:mo>
                        <m:msub>
                          <m:mi>θ</m:mi>
                          <m:mtext>k</m:mtext>
                        </m:msub>
                        <m:mo>−</m:mo>
                        <m:msub>
                          <m:mi>θ</m:mi>
                          <m:mn>0</m:mn>
                        </m:msub>
                        <m:mo>=</m:mo>
                      </m:mrow>
                    </m:mrow>
                  </m:mstyle>
                  <m:mstyle displaystyle="true">
                    <m:mrow>
                      <m:munderover>
                        <m:mo>∫</m:mo>
                        <m:mrow>
                          <m:msub>
                            <m:mi>t</m:mi>
                            <m:mn>0</m:mn>
                          </m:msub>
                        </m:mrow>
                        <m:mrow>
                          <m:msub>
                            <m:mi>t</m:mi>
                            <m:mtext>k</m:mtext>
                          </m:msub>
                        </m:mrow>
                      </m:munderover>
                      <m:mrow>
                        <m:mi>ω</m:mi>
                        <m:mo stretchy="false">(</m:mo>
                        <m:mi>t</m:mi>
                        <m:mo stretchy="false">)</m:mo>
                        <m:mi>d</m:mi>
                        <m:mi>t</m:mi>
                      </m:mrow>
                    </m:mrow>
                  </m:mstyle>
                  <m:mo>.</m:mo>
                </m:mrow>
              </m:math>
            </equation>
            <para id="ked-1bkpg8n6q_qio">Następnie, w celu sprawdzenia wyniku, użyjemy równania kinematycznego dla stałego przyspieszania.</para>
          </item>
        </list>
        <para id="ked-1bkpg9ja0_g7g">
          <title>Rozwiązanie</title>
        </para>
        <list id="ked-1bkpgamn0_ha" list-type="enumerated" number-style="lower-alpha">
          <item>Obliczając nachylenie otrzymamy:<equation id="ked-1bkpgbnam_nfg">
              <m:math>
                <m:mrow>
                  <m:mi>ε</m:mi>
                  <m:mo>=</m:mo>
                  <m:mfrac>
                    <m:mrow>
                      <m:mi>ω</m:mi>
                      <m:mo>−</m:mo>
                      <m:msub>
                        <m:mi>ω</m:mi>
                        <m:mn>0</m:mn>
                      </m:msub>
                    </m:mrow>
                    <m:mrow>
                      <m:mi>t</m:mi>
                      <m:mo>−</m:mo>
                      <m:msub>
                        <m:mi>t</m:mi>
                        <m:mn>0</m:mn>
                      </m:msub>
                    </m:mrow>
                  </m:mfrac>
                  <m:mo>=</m:mo>
                  <m:mfrac>
                    <m:mrow>
                      <m:mo stretchy="false">(</m:mo>
                      <m:mn>0</m:mn>
                      <m:mo>−</m:mo>
                      <m:mn>30,0</m:mn>
                      <m:mo stretchy="false">)</m:mo>
                      <m:mspace width="0.2em"/>
                      <m:mtext>rad/s</m:mtext>
                    </m:mrow>
                    <m:mrow>
                      <m:mo stretchy="false">(</m:mo>
                      <m:mn>5,0</m:mn>
                      <m:mo>−</m:mo>
                      <m:mn>0</m:mn>
                      <m:mo stretchy="false">)</m:mo>
                      <m:mspace width="0.2em"/>
                      <m:mtext>s</m:mtext>
                    </m:mrow>
                  </m:mfrac>
                  <m:mo>=</m:mo>
                  <m:mn>−6.0</m:mn>
                  <m:mspace width="0.2em"/>
                  <m:msup>
                    <m:mrow>
                      <m:mtext>rad/s</m:mtext>
                    </m:mrow>
                    <m:mn>2</m:mn>
                  </m:msup>
                  <m:mo>.</m:mo>
                </m:mrow>
              </m:math>
            </equation>
          </item>
          <item>Możemy wyznaczyć pole obszaru pod krzywą poprzez obliczenie powierzchni trójkąta prostokątnego, jak pokazano na rysunku 3.<figure id="CNX_UPhysics_10_02_PropSol">
              <media
                id="ked-1bkpgksvt_7e"
                alt="Figure is a graph of the angular velocity in rads per second plotted versus time in seconds. Angular velocity decreases linearly with time, from 30 rads per second at zero seconds to zero at 5 seconds. The area under the curve is filled.">
                <image src="CNX_UPhysics_10_02_PropSol.jpg" mime-type="image/jpeg"/>
              </media>
              <caption>
                Pole pod krzywą jest polem trójkąta prostokątnego.
              </caption>
            </figure>
            <equation id="ked-1bkpgn2jr_sjo">
              <m:math>
                <m:mtable>
                  <m:mtr>
                    <m:mtd columnalign="right">
                      <m:mtext>Δ</m:mtext>
                      <m:mi>θ</m:mi>
                    </m:mtd>
                    <m:mtd columnalign="left">
                      <m:mo>=</m:mo>
                    </m:mtd>
                    <m:mtd columnalign="left">
                      <m:mtext>pole</m:mtext>
                      <m:mrow>
                        <m:mo>(</m:mo>
                        <m:mrow>
                          <m:mtext>trójkąta</m:mtext>
                        </m:mrow>
                        <m:mo>)</m:mo>
                      </m:mrow>
                      <m:mo>;</m:mo>
                    </m:mtd>
                  </m:mtr>
                  <m:mtr>
                    <m:mtd columnalign="right">
                      <m:mtext>Δ</m:mtext>
                      <m:mi>θ</m:mi>
                    </m:mtd>
                    <m:mtd columnalign="left">
                      <m:mo>=</m:mo>
                    </m:mtd>
                    <m:mtd columnalign="left">
                      <m:mfrac>
                        <m:mn>1</m:mn>
                        <m:mn>2</m:mn>
                      </m:mfrac>
                      <m:mo stretchy="false">(</m:mo>
                      <m:mn>30</m:mn>
                      <m:mspace width="0.2em"/>
                      <m:mtext>rad/s</m:mtext>
                      <m:mo stretchy="false">)</m:mo>
                      <m:mo stretchy="false">(</m:mo>
                      <m:mn>5</m:mn>
                      <m:mspace width="0.2em"/>
                      <m:mtext>s</m:mtext>
                      <m:mo stretchy="false">)</m:mo>
                      <m:mo>=</m:mo>
                      <m:mn>75</m:mn>
                      <m:mspace width="0.2em"/>
                      <m:mtext>rad</m:mtext>
                      <m:mtext>.</m:mtext>
                    </m:mtd>
                  </m:mtr>
                </m:mtable>
              </m:math>
            </equation>Weryfikujemy otrzymany rezultat przy użyciu równania
            <equation id="ked-1bkpgnucf_h6">
              <m:math>
                <m:mrow>
                  <m:msub>
                    <m:mi>θ</m:mi>
                    <m:mtext>k</m:mtext>
                  </m:msub>
                  <m:mo>=</m:mo>
                  <m:msub>
                    <m:mi>θ</m:mi>
                    <m:mn>0</m:mn>
                  </m:msub>
                  <m:mo>+</m:mo>
                  <m:msub>
                    <m:mi>ω</m:mi>
                    <m:mn>0</m:mn>
                  </m:msub>
                  <m:mi>t</m:mi>
                  <m:mo>+</m:mo>
                  <m:mfrac>
                    <m:mn>1</m:mn>
                    <m:mn>2</m:mn>
                  </m:mfrac>
                  <m:mi>ε</m:mi>
                  <m:msup>
                    <m:mi>t</m:mi>
                    <m:mn>2</m:mn>
                  </m:msup>
                  <m:mo>.</m:mo>
                </m:mrow>
              </m:math>
            </equation>Wstawiając
            <m:math>
              <m:mrow>
                <m:msub>
                  <m:mi>θ</m:mi>
                  <m:mn>0</m:mn>
                </m:msub>
              </m:mrow>
            </m:math>
            otrzymujemy<equation id="ked-1bkpgqbd5_v38">
              <m:math>
                <m:mrow>
                  <m:msub>
                    <m:mi>θ</m:mi>
                    <m:mn>0</m:mn>
                  </m:msub>
                  <m:mo>=</m:mo>
                  <m:mo stretchy="false">(</m:mo>
                  <m:mn>30,0</m:mn>
                  <m:mspace width="0.2em"/>
                  <m:mrow>
                    <m:mrow>
                      <m:mtext>rad</m:mtext>
                    </m:mrow>
                    <m:mtext>/</m:mtext>
                    <m:mtext>s</m:mtext>
                  </m:mrow>
                  <m:mo stretchy="false">)</m:mo>
                  <m:mo stretchy="false">(</m:mo>
                  <m:mn>5,0</m:mn>
                  <m:mspace width="0.2em"/>
                  <m:mtext>s</m:mtext>
                  <m:mo stretchy="false">)</m:mo>
                  <m:mo>+</m:mo>
                  <m:mfrac>
                    <m:mn>1</m:mn>
                    <m:mn>2</m:mn>
                  </m:mfrac>
                  <m:msup>
                    <m:mrow>
                      <m:mo stretchy="false">(</m:mo>
                      <m:mn>−6.0</m:mn>
                      <m:mspace width="0.2em"/>
                      <m:mrow>
                        <m:mrow>
                          <m:mtext>rad</m:mtext>
                        </m:mrow>
                        <m:mtext>/</m:mtext>
                        <m:mrow>
                          <m:msup>
                            <m:mtext>s</m:mtext>
                            <m:mn>2</m:mn>
                          </m:msup>
                          <m:mo stretchy="false">)</m:mo>
                          <m:mo stretchy="false">(</m:mo>
                          <m:mn>5,0</m:mn>
                        </m:mrow>
                      </m:mrow>
                      <m:mspace width="0.2em"/>
                      <m:mrow>
                        <m:mrow>
                          <m:mtext>rad</m:mtext>
                        </m:mrow>
                        <m:mtext>/</m:mtext>
                        <m:mtext>s</m:mtext>
                      </m:mrow>
                      <m:mo stretchy="false">)</m:mo>
                    </m:mrow>
                    <m:mn>2</m:mn>
                  </m:msup>
                  <m:mo>=</m:mo>
                  <m:mn>150,0</m:mn>
                  <m:mo>−</m:mo>
                  <m:mn>75,0</m:mn>
                  <m:mo>=</m:mo>
                  <m:mn>75,0</m:mn>
                  <m:mspace width="0.2em"/>
                  <m:mtext>rad</m:mtext>
                  <m:mo>.</m:mo>
                </m:mrow>
              </m:math>
            </equation>To potwierdza rozwiązanie otrzymane z wyliczenia pola pod krzywą zależności prędkości kątowej od czasu.</item>
        </list>
        <para id="ked-1bkpgs1es_ks8">
          <title>Uwaga</title>
          Widzimy z części (b), że istnieją alternatywne podejścia do analizy obrotów wokół stałej osi ze stałym przyśpieszeniem kątowym. Nasze rozwiązania zaczęliśmy od podejścia graficznego i zweryfikowaliśmy to rozwiązanie przy użyciu równań kinematyki
          ruchu obrotowego. Ponieważ
          <m:math>
            <m:mrow>
              <m:mi>ε</m:mi>
              <m:mo>=</m:mo>
              <m:mfrac>
                <m:mrow>
                  <m:mi>d</m:mi>
                  <m:mi>ω</m:mi>
                </m:mrow>
                <m:mrow>
                  <m:mi>d</m:mi>
                  <m:mi>t</m:mi>
                </m:mrow>
              </m:mfrac>
            </m:mrow>
          </m:math>, możemy wykonać taką samą analizę graficzną wykresu zależności przyspieszenia kątowego od czasu. Obszar pod krzywą
          <m:math xmlns="http://www.w3.org/1998/Math/MathML">
            <m:mi>ε<!-- ε --></m:mi>
            <m:mo>=</m:mo>
            <m:mi>f</m:mi>
            <m:mo stretchy="false">(</m:mo>
            <m:mi>t</m:mi>
            <m:mo stretchy="false">)</m:mo>
          </m:math>
          daje nam zmianę prędkości kątowej. Ponieważ w tej części przyspieszenie kątowe jest stałe, jest to proste ćwiczenie.
        </para>
      </example>
    </section>

    <section id="ked-1bkrccue3_1s">
      <title>Podsumowanie</title>
      <list id="ked-1bkrce18b_16">
        <item>Kinematyka ruchu obrotowego opisuje zależności między drogą kątową, prędkością kątową, przyspieszeniem kątowym i czasem.
        </item>
        <item>W przypadku stałego przyspieszenia kątowego zależność prędkości kątowej od czasu jest liniowa. Zatem, średnia prędkość kątowa jest średnią arytmetyczną prędkości początkowej i prędkości końcowej w danym okresie czasu:
          <equation id="ked-1bkrceo6s_cj">
            <m:math>
              <m:mrow>
                <m:mover accent="true">
                  <m:mi>ω</m:mi>
                  <m:mo>–</m:mo>
                </m:mover>
                <m:mo>=</m:mo>
                <m:mfrac>
                  <m:mrow>
                    <m:msub>
                      <m:mi>ω</m:mi>
                      <m:mn>0</m:mn>
                    </m:msub>
                    <m:mo>+</m:mo>
                    <m:msub>
                      <m:mi>ω</m:mi>
                      <m:mtext>konc</m:mtext>
                    </m:msub>
                  </m:mrow>
                  <m:mn>2</m:mn>
                </m:mfrac>
                <m:mo>.</m:mo>
              </m:mrow>
            </m:math>
          </equation>
        </item>
        <item>
          Zastosowaliśmy analizę graficzną do wyznaczenia wielkości obrotowych dla ruchu obrotowego wokół stałej osi, ze stałym przyspieszeniem kątowym. Z zależności
          <m:math>
            <m:mrow>
              <m:mi>ω</m:mi>
              <m:mo>=</m:mo>
              <m:mfrac>
                <m:mrow>
                  <m:mi>d</m:mi>
                  <m:mi>θ</m:mi>
                </m:mrow>
                <m:mrow>
                  <m:mi>d</m:mi>
                  <m:mi>t</m:mi>
                </m:mrow>
              </m:mfrac>
            </m:mrow>
          </m:math>
          otrzymujemy, że powierzchnia pod wykresem zależności prędkości kątowej od czasu jest równa drodze kątowej,
          <m:math>
            <m:mrow>
              <m:msub>
                <m:mi>θ</m:mi>
                <m:mtext>konc</m:mtext>
              </m:msub>
              <m:mo>−</m:mo>
              <m:msub>
                <m:mi>θ</m:mi>
                <m:mn>0</m:mn>
              </m:msub>
              <m:mo>=</m:mo>
              <m:mtext>Δ</m:mtext>
              <m:mi>θ</m:mi>
              <m:mo>=</m:mo>
              <m:mstyle displaystyle="true">
                <m:mrow>
                  <m:munderover>
                    <m:mo>∫</m:mo>
                    <m:mrow>
                      <m:msub>
                        <m:mi>t</m:mi>
                        <m:mn>0</m:mn>
                      </m:msub>
                    </m:mrow>
                    <m:mi>t</m:mi>
                  </m:munderover>
                  <m:mrow>
                    <m:mi>ω</m:mi>
                    <m:mo stretchy="false">(</m:mo>
                    <m:mi>t</m:mi>
                    <m:mo stretchy="false">)</m:mo>
                    <m:mi>d</m:mi>
                    <m:mi>t</m:mi>
                  </m:mrow>
                </m:mrow>
              </m:mstyle>
            </m:mrow>
          </m:math>
          . Otrzymany rezultat analizy graficznej można zweryfikować przy pomocy równań kinematycznych dla ruchu ze stałym przyspieszeniem kątowym. Analogicznie, ponieważ
          <m:math>
            <m:mrow>
              <m:mi>ε</m:mi>
              <m:mo>=</m:mo>
              <m:mfrac>
                <m:mrow>
                  <m:mi>d</m:mi>
                  <m:mi>ω</m:mi>
                </m:mrow>
                <m:mrow>
                  <m:mi>d</m:mi>
                  <m:mi>t</m:mi>
                </m:mrow>
              </m:mfrac>
            </m:mrow>
          </m:math>
          pole powierzchni pod wykresem przyspieszenia kątowego w funkcji czasu daje nam zmianę wartości prędkości kątowej
          <m:math>
            <m:mrow>
              <m:msub>
                <m:mi>ω</m:mi>
                <m:mi>konc</m:mi>
              </m:msub>
              <m:mo>−</m:mo>
              <m:msub>
                <m:mi>ω</m:mi>
                <m:mn>0</m:mn>
              </m:msub>
              <m:mo>=</m:mo>
              <m:mtext>Δ</m:mtext>
              <m:mi>ω</m:mi>
              <m:mo>=</m:mo>
              <m:mstyle displaystyle="true">
                <m:mrow>
                  <m:munderover>
                    <m:mo>∫</m:mo>
                    <m:mrow>
                      <m:msub>
                        <m:mi>t</m:mi>
                        <m:mn>0</m:mn>
                      </m:msub>
                    </m:mrow>
                    <m:mi>t</m:mi>
                  </m:munderover>
                  <m:mrow>
                    <m:mi>ε</m:mi>
                    <m:mo stretchy="false">(</m:mo>
                    <m:mi>t</m:mi>
                    <m:mo stretchy="false">)</m:mo>
                    <m:mi>d</m:mi>
                    <m:mi>t</m:mi>
                  </m:mrow>
                </m:mrow>
              </m:mstyle>
            </m:mrow>
          </m:math>.</item>
      </list>
    </section>
    <section id="ked-1bkrcjav0_pr">
      <title>Pytania
      </title>
      <exercise id="ked-1bkrck5mj_4n8">
        <problem id="ked-1bkrck5lk_noo">
          <para id="ked-1bkrck5n5_u8o">Jeżeli przyspieszenie kątowe obracającego się ciała sztywnego ma stałą wartość, to jaką funkcją czasu jest jego prędkość kątowa?</para>
        </problem>
        <solution id="ked-1bkrck5m0_to">
          <para id="ked-1bkrck5n4_ub">Linia prosta, zależność liniowa w funkcji czasu.</para>
        </solution>
      </exercise>
      <exercise id="ked-1bkrcn2ha_q4o">
        <problem id="ked-1bkrcn2gc_16g">
          <para id="ked-1bkrcn2hf_6s8">Jeżeli przyspieszenie kątowe obracającego się ciała sztywnego ma stałą wartość, to jaką funkcją czasu jest jego położenie kątowe?</para>
        </problem>
      </exercise>
      <exercise id="ked-1bkrcoarp_66">
        <problem id="ked-1bkrcoi76_2v8">
          <para id="ked-1bkrconch_rr8">Jeżeli przyspieszenie kątowe obracającego się ciała sztywnego jest równe zero, to jaką funkcją czasu jest jego prędkość kątowa?</para>
        </problem>
        <solution id="ked-1bkrcpkjn_qa8">
          <para id="ked-1bkrcpmpf_5o">Stałą</para>
        </solution>
      </exercise>
      <exercise id="ked-1bkrcuk5m_emg">
        <problem id="ked-1bkrcupau_91o">
          <para id="ked-1bkrcuk5m_ymv">
            Kij o znikomo małej masie, do którego obu końców przyczepiono ciężarki, obraca się ze stałą prędkością kątową wokół osi przechodzącej przez jego środek. Czy całkowite przyspieszenie tego układu może być równy zero, jeżeli prędkość kątowa kija jest
            stała?
          </para>
        </problem>
      </exercise>
    </section>
    <section id="ked-1bkrd0vae_sog">
      <title>Zadania</title>
      <exercise id="ked-1bkrd1pmi_gag">
        <problem id="ked-1bkrd1plb_e5g">
          <para id="ked-1bkrd1pkq_6s">Koło obraca się ze stałym przyspieszeniem kątowym
            <m:math>
              <m:mrow>
                <m:mn>5,0</m:mn>
                <m:mspace width="0.2em"/>
                <m:mrow>
                  <m:mrow>
                    <m:mtext>rad</m:mtext>
                  </m:mrow>
                  <m:mtext>/</m:mtext>
                  <m:mrow>
                    <m:msup>
                      <m:mtext>s</m:mtext>
                      <m:mn>2</m:mn>
                    </m:msup>
                  </m:mrow>
                </m:mrow>
              </m:mrow>
            </m:math>. Startując od spoczynku obróciło się ono o 300 radianów. (a) Jaka jest jego końcowa prędkość obrotowa? (b) W jakim czasie przebyło drogę kątową 300 radianów?</para>
        </problem>
        <solution id="ked-1bkrd1pn8_eno">
          <para id="ked-1bkrd1pms_nmo">a.
            <m:math>
              <m:mrow>
                <m:mi>ω</m:mi>
                <m:mo>=</m:mo>
                <m:mn>54,8</m:mn>
                <m:mspace width="0.2em"/>
                <m:mrow>
                  <m:mrow>
                    <m:mtext>rad</m:mtext>
                  </m:mrow>
                  <m:mtext>/</m:mtext>
                  <m:mtext>s</m:mtext>
                </m:mrow>
              </m:mrow>
            </m:math>;
          </para>
          <para id="ked-1bkrgn902_838">
            b.
            <m:math>
              <m:mrow>
                <m:mi>t</m:mi>
                <m:mo>=</m:mo>
                <m:mn>11,0</m:mn>
                <m:mspace width="0.2em"/>
                <m:mtext>s</m:mtext>
              </m:mrow>
            </m:math>

          </para>
        </solution>
      </exercise>
      <exercise id="ked-1bkrfavb3_gsg">
        <problem id="ked-1bkrfav9k_u8g">
          <para id="ked-1bkrfavb6_72">Obracające się ze stałym przyspieszeniem kątowym koło zamachowe obróciło się w ciągu sześciu sekund o 300 radianów, osiągając w ten sposób prędkość kątową 100 rad/s. (a) Jaka była wartość jego prędkości kątowej na początku
            6 s? (b) Jaka jest wartość jego przyspieszenia kątowego?</para>
        </problem>
      </exercise>
      <exercise id="ked-1bkrfdeml_n58">
        <problem id="ked-1bkrfdeo5_okg">
          <para id="ked-1bkrfdeoe_p1o">Prędkość kątowa obracającego się ciała sztywnego wzrasta od 500 do 1500 obr/min, w ciągu 120 s. (a) Jaka jest wartość przyspieszenia kątowego tego ciała? (b) O jaki kąt obróciło się w ciągu tych 120 s ?</para>
        </problem>
        <solution id="ked-1bkrfdene_o18">
          <para id="ked-1bkrfden8_7v8">a.
            <m:math>
              <m:mrow>
                <m:mn>0,87</m:mn>
                <m:mspace width="0.2em"/>
                <m:mrow>
                  <m:mrow>
                    <m:mtext>rad</m:mtext>
                  </m:mrow>
                  <m:mtext>/</m:mtext>
                  <m:mrow>
                    <m:msup>
                      <m:mtext>s</m:mtext>
                      <m:mn>2</m:mn>
                    </m:msup>
                  </m:mrow>
                </m:mrow>
              </m:mrow>
            </m:math>;</para>
          <para id="ked-1bkrgn90j_mtg">
            b.
            <m:math>
              <m:mrow>
                <m:mi>θ</m:mi>
                <m:mo>=</m:mo>
                <m:mn>12 560</m:mn>
                <m:mspace width="0.2em"/>
                <m:mtext>rad</m:mtext>
              </m:mrow>
            </m:math>

          </para>
        </solution>
      </exercise>
      <exercise id="ked-1bkrfeoui_g38">
        <problem id="ked-1bkrffh45_u9">
          <para id="ked-1bkrffh3a_smg">Koło obrotowe zwalnia od 600 do 400 obr/min, wykonując w tym czasie 40 obrotów. (a) Wyznacz jego przyspieszenie kątowe. (b) Ile obrotów wykona ono w czasie 120 sekund?</para>
        </problem>
      </exercise>
      <exercise id="ked-1bkrffpmt_ij">
        <problem id="ked-1bkrffpn1_k9">
          <para id="ked-1bkrffple_iqg">
            Koło o średnicy jednego metra obraca się z przyspieszeniem kątowym
            <m:math>
              <m:mrow>
                <m:mn>4</m:mn>
                <m:mspace width="0.2em"/>
                <m:mrow>
                  <m:mrow>
                    <m:mtext>rad</m:mtext>
                  </m:mrow>
                  <m:mtext>/</m:mtext>
                  <m:mrow>
                    <m:msup>
                      <m:mtext>s</m:mtext>
                      <m:mn>2</m:mn>
                    </m:msup>
                  </m:mrow>
                </m:mrow>
              </m:mrow>
            </m:math>. (a) Jaka jest prędkość kątowa koła po 10 sekundach, jeżeli prędkość początkowa wynosiła 2,0 rad/s. (b) O jaki kąt obróci się ono po 10 s? (c) Jaka jest prędkość styczna oraz przyspieszenie styczne punktów na obrzeżu koła pod koniec 10 s ruchu?
          </para>
        </problem>
        <solution id="ked-1bkrffpkp_qc">
          <para id="ked-1bkrffplm_rsg">a.
            <m:math>
              <m:mrow>
                <m:mi>ω</m:mi>
                <m:mo>=</m:mo>
                <m:mn>42,0</m:mn>
                <m:mspace width="0.2em"/>
                <m:mrow>
                  <m:mrow>
                    <m:mtext>rad</m:mtext>
                  </m:mrow>
                  <m:mtext>/</m:mtext>
                  <m:mtext>s</m:mtext>
                </m:mrow>
              </m:mrow>
            </m:math>;
          </para>
          <para id="ked-1bkrgn8va_cs">
            b.
            <m:math>
              <m:mrow>
                <m:mi>θ</m:mi>
                <m:mo>=</m:mo>
                <m:mn>200</m:mn>
                <m:mspace width="0.2em"/>
                <m:mtext>rad</m:mtext>
              </m:mrow>
            </m:math>;
          </para>
          <para id="ked-1bkrgn909_5h">

            c.
            <m:math xmlns="http://www.w3.org/1998/Math/MathML">
              <m:msub>
                <m:mi>v</m:mi>
                <m:mi>t</m:mi>
              </m:msub>
              <m:mo>=</m:mo>
              <m:mn>42</m:mn>
              <m:mspace width="0.2em"/>
              <m:mtext>m/s</m:mtext>
            </m:math>
            ,
            <m:math xmlns="http://www.w3.org/1998/Math/MathML">
              <m:msub>
                <m:mi>a</m:mi>
                <m:mi>t</m:mi>
              </m:msub>
              <m:mo>=</m:mo>
              <m:mn>4,0</m:mn>
              <m:mspace width="0.2em"/>
              <m:msup>
                <m:mtext>m/s</m:mtext>
                <m:mn>2</m:mn>
              </m:msup>
            </m:math>
          </para>
        </solution>
      </exercise>
      <exercise id="ked-1bkrg291a_v2">
        <problem id="ked-1bkrg2hl0_t8">
          <para id="ked-1bkrg2hj7_68">Koło o średnicy 50 cm, obraca się ze stałym przyspieszeniem kątowym
            <m:math>
              <m:mrow>
                <m:mn>5,0</m:mn>
                <m:mspace width="0.2em"/>
                <m:mrow>
                  <m:mrow>
                    <m:mtext>rad</m:mtext>
                  </m:mrow>
                  <m:mtext>/</m:mtext>
                  <m:mrow>
                    <m:msup>
                      <m:mtext>s</m:mtext>
                      <m:mn>2</m:mn>
                    </m:msup>
                  </m:mrow>
                </m:mrow>
              </m:mrow>
            </m:math>
            wokół poziomej osi przechodzącej przez jego środek. Początkowo koło było w spoczynku. (a) Gdzie, po 10 sekundach znajduje się punkt koła, który początkowo był w jego najniższym punkcie? (b) Jaka jest w tym momencie wartość jego przyspieszenia
            liniowego?</para>
        </problem>
      </exercise>
      <exercise id="ked-1bkrg4ob3_5s8">
        <problem id="ked-1bkrg4qnu_23g">
          <para id="ked-1bkrg4tki_tg">Pierścień o średnicy 10 cm obraca się ze stałym przyspieszeniem kątowym
            <m:math>
              <m:mrow>
                <m:mn>1,0</m:mn>
                <m:mrow>
                  <m:mrow>
                    <m:mspace width="0.2em"/>
                    <m:mtext>rad</m:mtext>
                  </m:mrow>
                  <m:mtext>/</m:mtext>
                  <m:mrow>
                    <m:msup>
                      <m:mtext>s</m:mtext>
                      <m:mn>2</m:mn>
                    </m:msup>
                  </m:mrow>
                </m:mrow>
              </m:mrow>
            </m:math>
            , w chwili
            <m:math>
              <m:mrow>
                <m:mi>t</m:mi>
                <m:mo>=</m:mo>
                <m:mn>0</m:mn>
              </m:mrow>
            </m:math>
            jego prędkość kątowa wynosiła
            <m:math xmlns="http://www.w3.org/1998/Math/MathML">
              <m:mn>2,0</m:mn>
              <m:mspace width="0.2em"/>
              <m:mtext>rad</m:mtext>
              <m:mtext>/</m:mtext>
              <m:mtext>s</m:mtext>
            </m:math>. (a) Wyznacz prędkość kątową pierścienia w chwili
            <m:math xmlns="http://www.w3.org/1998/Math/MathML">
              <m:mi>t</m:mi>
              <m:mo>=</m:mo>
              <m:mn>5</m:mn>
              <m:mspace width="0.2em"/>
              <m:mtext>s</m:mtext>
            </m:math>. (b) O jaki kąt obrócił się w tym czasie pierścień? (c) Jaka jest wartość przyspieszenia stycznego punktu pierścienia w chwili
            <m:math>
              <m:mi>t</m:mi>
              <m:mo>=</m:mo>
              <m:mn>5</m:mn>
              <m:mspace width="0.2em"/>
              <m:mtext>s</m:mtext>
            </m:math>?</para>
        </problem>
        <solution id="ked-1bkrgfbjk_fjg">
          <para id="ked-1bkrgfbhd_gl8">a.
            <m:math>
              <m:mrow>
                <m:mi>ω</m:mi>
                <m:mo>=</m:mo>
                <m:mn>7,0</m:mn>
                <m:mspace width="0.2em"/>
                <m:mrow>
                  <m:mrow>
                    <m:mtext>rad</m:mtext>
                  </m:mrow>
                  <m:mtext>/</m:mtext>
                  <m:mtext>s</m:mtext>
                </m:mrow>
              </m:mrow>
            </m:math>
          </para>
          <para id="ked-1bkrgn90b_sg8">b.
            <m:math>
              <m:mrow>
                <m:mi>θ</m:mi>
                <m:mo>=</m:mo>
                <m:mn>22,5</m:mn>
                <m:mspace width="0.2em"/>
                <m:mtext>rad</m:mtext>
              </m:mrow>
            </m:math>
          </para>
          <para id="ked-1bkrgn8vn_v0o">c.
            <m:math>
              <m:mrow>
                <m:msub>
                  <m:mi>a</m:mi>
                  <m:mtext>t</m:mtext>
                </m:msub>
                <m:mo>=</m:mo>
                <m:mn>0,1</m:mn>
                <m:mspace width="0.2em"/>
                <m:mrow>
                  <m:mtext>m</m:mtext>
                  <m:mtext>/</m:mtext>
                  <m:mtext>s</m:mtext>
                </m:mrow>
              </m:mrow>
            </m:math>
          </para>
        </solution>
      </exercise>
      <exercise id="ked-1bkrgj3qb_vio">
        <problem id="ked-1bkrgj5sp_pm8">
          <para id="ked-1bkrgj96h_v8o">Poniżej przedstawiona jest zależność od czasu prędkości kątowej obrotu łopatek wentylatora poduszkowca . (a) Jaki kąt zakreśliły łopatki w ciągu pierwszych 8 sekund? Sprawdź rozwiązanie używając równań kinematyki ruchu obrotowego.</para>
          <figure id="CNX_UPhysics_10_02_Prob15_img">
            <media id="ked-1bkrgjphp_vqg" alt="Figure is a graph of the angular velocity in rev per minute plotted versus time in seconds. Angular velocity is zero when the time is equal to zero and increases linearly with time">
              <image src="CNX_UPhysics_10_02_Prob15_img.jpg" mime-type="image/jpeg"/>
            </media>
          </figure>
        </problem>
      </exercise>
      <exercise id="ked-1bkrgmmeg_spo">
        <problem id="ked-1bkrgmmf2_geg">
          <para id="ked-1bkrgmmdm_158">Do obu końców pręta o długości 20 cm przyczepiono koraliki. W chwili początkowej pręt się nie obracał. Jeżeli koraliki mają osiągnąć prędkość liniową 20 m/s w ciągu 7 sekund, to z jakim przyspieszeniem kątowym pręt powinien się poruszać?
          </para>
        </problem>
        <solution id="ked-1bkrgmmes_23">
          <para id="ked-1bkrgmmec_p7">
            <m:math>
              <m:mrow>
                <m:mi>ε</m:mi>
                <m:mo>=</m:mo>
                <m:mn>28,6</m:mn>
                <m:mspace width="0.2em"/>
                <m:mrow>
                  <m:mrow>
                    <m:mtext>rad</m:mtext>
                  </m:mrow>
                  <m:mtext>/</m:mtext>
                  <m:mrow>
                    <m:msup>
                      <m:mtext>s</m:mtext>
                      <m:mn>2</m:mn>
                    </m:msup>
                  </m:mrow>
                </m:mrow>
              </m:mrow>
            </m:math>.</para>
        </solution>
      </exercise>
    </section>
  </content>

  <glossary>
    <definition id="fs-id1167131105116">
      <term>Kinematyka ruchu obrotowego (ang. kinematics of rotational motion)</term>
      <meaning id="fs-id1167131105121">opisuje zależność od czasu między drogą kątową (kątem obrotu), prędkością kątową i przyspieszeniem kątowym.</meaning>
    </definition>
  </glossary>
</document>
`;
